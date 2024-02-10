import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import { sendMail } from './EmailManger.js'
import { AccountData, AccountUpdateData, MailData, PendingAccountData, PendingResetPassword, ProductData, ProjectLink, SocialLink } from './DataType.js'
import MongoAPI from './Mongo.js'
import { generateId, generateOTP, getEmailVerifyHtml, getResetPasswordHtml } from './Utils.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import multer from 'multer'
import fs from 'fs'
import path from 'path'

// console.log(path.join(__dirname, '..', 'public'))






dotenv.config()

const port = process.env.EXPRESS_PORT || 3001
const tokenKey = process.env.TOKEN_KEY || 'test'
const atlas = process.env.ATLAS_URI || '';
const mailerEmail = process.env.NODE_MAILER_EMAIL || ''
const serverUrl = process.env.SERVER_URL || 'http://localhost:3001'

const uploadLoc = process.env.UPLOAD_LOC || ''          // /home/nitesh/Personal/web-dev/personal/FlaxStudioSite/back/public/uploads
console.log( uploadLoc)

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())




const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const destinationPath = uploadLoc;
        cb(null, destinationPath);
    },
    filename: function (req, file, cb) {
        const index = (file.originalname as string).lastIndexOf('.')
        const ext = (file.originalname as string).slice(index)

        const filename = generateId() + ext
        cb(null, filename);
    }
})

const upload = multer({ storage: storage })

const mongoApi = new MongoAPI()
let isMongoConnected = await mongoApi.connectMongoose(atlas)


// --------------------- middleware ---------------------------

app.use((req, res, next) => {
    if (!isMongoConnected) {
        
        res.status(503).send("Database connection error")
    } else {
        next()
    }
})

// serve static content
// app.use('/public', express.static('public'));



// auth middleware
app.get('/admin/*', async (req, res, next) => {

    try {
        const token =
            req.body.token || req.query.token || req.headers["x-access-token"];

        if (!token) {
            return res.status(403).send("A token is required for authentication");
        }

        const decoded = jwt.verify(token, tokenKey)
        res.locals.accountId = decoded
        if (await mongoApi.isAccountExist(decoded as string)) {
            next()
        } else {
            return res.status(401).send("Invalid Token");
        }


    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
})

app.delete('/admin/*', async (req, res, next) => {

    try {
        const token =
            req.body.token || req.query.token || req.headers["x-access-token"];

        if (!token) {
            return res.status(403).send("A token is required for authentication");
        }

        const decoded = jwt.verify(token, tokenKey)
        res.locals.accountId = decoded
        if (await mongoApi.isAccountExist(decoded as string)) {
            next()
        } else {
            return res.status(401).send("Invalid Token");
        }


    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
})

app.post('/admin/*', async (req, res, next) => {

    try {
        const token =
            req.body.token || req.query.token || req.headers["x-access-token"];

        if (!token) {
            return res.status(403).send("A token is required for authentication");
        }

        const decoded = jwt.verify(token, tokenKey)
        res.locals.accountId = decoded
        if (await mongoApi.isAccountExist(decoded as string)) {
            next()
        } else {
            return res.status(401).send("Invalid Token");
        }


    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
})

app.put('/admin/*', async (req, res, next) => {

    try {
        const token =
            req.body.token || req.query.token || req.headers["x-access-token"];

        if (!token) {
            return res.status(403).send("A token is required for authentication");
        }

        const decoded = jwt.verify(token, tokenKey)
        res.locals.accountId = decoded
        if (await mongoApi.isAccountExist(decoded as string)) {
            next()
        } else {
            return res.status(401).send("Invalid Token");
        }


    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
})



// ---------------------- Authentication ------------------------
app.post('/sign-in', async (req, res) => {
    try {
        let email = req.body.email as string
        let password = req.body.password as string

        let account = await mongoApi.getAccount(email)
        if (account != null) {

            // check if password is correct or not
            if (!await bcrypt.compare(password, account.password as string)) {
                res.status(400).send('Wrong password!')
            } else {

                // create token for auth
                const token = jwt.sign(account._id, tokenKey)
                res.status(200).send({ token: token })
            }
        } else {
            res.status(400).send('No account found with this email, try sign up')
        }
    } catch (error) {
        console.log(error)
        res.status(400).send('Bad request')
    }
})


// only work with sign in with email

let pendingReg = Array<PendingAccountData>()

app.post('/sign-up', async (req, res) => {
    try {
        let firstName = req.body.first as string
        let lastName = req.body.last as string
        let email = req.body.email as string
        let password = req.body.password as string


        let account = await mongoApi.getAccount(email)
        if (account != null) {
            res.status(409).send('Account already exist with this email')
            return
        }

        const newAccount: PendingAccountData = {
            firstName: firstName,
            lastName: lastName,
            email: email.toLowerCase(),
            password: await bcrypt.hash(password, 10),          // encrypt password
            otp: generateOTP(),
            token: generateId()
        }

        // check if pending reg already have email in list then remove the previous and add new
        for (let index = 0; index < pendingReg.length; index++) {
            if (email == pendingReg[index].email) {

                pendingReg = pendingReg.splice(index, 1)  // remove
                break
            }
        }

        // add new reg
        pendingReg.push(newAccount)

        // sending mail
        sendMail({
            from: mailerEmail,
            to: email,
            subject: `Confirm Your Account Registration: ${email}`,
            html: getEmailVerifyHtml(newAccount.otp, email)
        })

        res.status(200).send({ token: newAccount.token })

    } catch (error) {
        res.status(400).send('Bad request')
    }

})


app.post('/verify-signup', async (req, res) => {
    try {
        const token = req.body.token as string
        const otp = req.body.otp as string

        for (let index = 0; index < pendingReg.length; index++) {

            let reg = pendingReg[index]
            if (reg.token == token && reg.otp == otp) {

                const socialLinks = Array<SocialLink>()
                socialLinks.push({ name: 'github', url: '' })
                socialLinks.push({ name: 'facebook', url: '' })
                socialLinks.push({ name: 'twitter', url: '' })
                socialLinks.push({ name: 'instagram', url: '' })
                socialLinks.push({ name: 'linkedin', url: '' })
                socialLinks.push({ name: 'hackerRank', url: '' })

                let account: AccountData = {
                    _id: generateId(),
                    firstName: reg.firstName,
                    lastName: reg.lastName,
                    email: reg.email,
                    password: reg.password,
                    mode: 'none',
                    profileImage: '/public/uploads/no_image.png',
                    role: 'MEMBER',
                    smallInfo: '',
                    about: '',
                    skills: '',
                    languages: '',
                    joinedAt: new Date().getTime(),
                    projects: '',
                    dob: 0,
                    location: '',
                    experience: 0,
                    expertIn: '',
                    socialLinks: socialLinks,
                    externalProjectsLinks: Array<ProjectLink>(),
                    seoDescription: '',
                    isPublic: false,
                    isApproved: false
                }
                let response = await mongoApi.createAccount(account)

                // create token for auth
                const token = jwt.sign(account._id, tokenKey)
                if (response != null) {
                    res.status(200).send({ token: token })
                } else {
                    res.status(400).send('Something went wrong')
                }

                pendingReg = pendingReg.splice(index, 1)  // remove
                return
            }
        }

        res.status(400).send('Unable to verify, check your OTP')
    } catch (error) {
        res.status(400).send('Bad request')
    }
})

app.post('/resend-verify-otp', async (req, res) => {
    try {
        let token = req.body.token as string

        for (let index = 0; index < pendingReg.length; index++) {
            let account = pendingReg[index]
            if (token == account.token) {

                // update data
                pendingReg[index].token = generateId()
                pendingReg[index].otp = generateOTP()

                // sending mail
                sendMail({
                    from: mailerEmail,
                    to: account.email,
                    subject: `Confirm Your Account Registration: ${account.email}`,
                    html: getEmailVerifyHtml(pendingReg[index].otp, account.email)
                })

                res.status(200).send({ token: account.token })
                return
            }
        }

        res.status(400).send('Bad request')

    } catch (error) {
        res.status(400).send('Bad request')
    }
})



let pendingReset = Array<PendingResetPassword>()
app.post('/forgot-password', async (req, res) => {
    try {
        const email = req.body.email as string
        let account = await mongoApi.getAccount(email)
        if (account == null) {
            res.status(400).send('No account exist with this email')
            return
        }

        let pending: PendingResetPassword = {
            accountId: account._id,
            email: email,
            token: generateId(),
            expiry: new Date().getTime() + 10 * 60000,       // expire after 10 min
            isUsed: false
        }

        let isUpdated = false
        // check and update if pending reset already exist
        for (let index = 0; index < pendingReset.length; index++) {

            // update previous 
            if (pendingReset[index].email == email) {
                pendingReset[index] = pending
                isUpdated = true
                break
            }
        }

        // add new if not updated
        if (!isUpdated) {
            pendingReset.push(pending)
        }

        // sending mail
        sendMail({
            from: mailerEmail,
            to: email,
            subject: `Reset Your Account Password: ${email}`,
            html: getResetPasswordHtml(account.firstName, `${serverUrl}/resetpassword/${pending.token}`)
        })

        res.status(200).send({ email: email })

    } catch (error) {
        res.status(400).send('Bad request')
    }

})

app.put('/reset-password/:token', async (req, res) => {
    try {
        const token = req.params.token as string
        const password = await bcrypt.hash(req.body.password as string, 10)          // encrypt password

        // matching token, expiry and then reset the password 
        const currentTime = new Date().getTime()

        for (let index = 0; index < pendingReset.length; index++) {
            if (pendingReset[index].token == token && currentTime < pendingReset[index].expiry) {

                if(pendingReset[index].isUsed == false){
                    const result = await mongoApi.resetAccountPassword(pendingReset[index].accountId, password)
                    if (result == null) {
                        res.status(400).send('Unable to reset your password')
                    } else {
                        res.status(200).send({ email: pendingReset[index].email })
                        pendingReset[index].isUsed = true
                    }
                }else{
                    res.status(400).send('Reset password already done')
                }
                
                return
            }
        }

        res.status(503).send('Reset password request expired')
    } catch (error) {
        res.status(400).send('Bad request')
    }
})


app.get('/reset-password-validity/:token', (req, res) => {
    try {
        const token = req.params.token as string
        const currentTime = new Date().getTime()

        let validTokenFound = false
       
        // matching token if it is not expired and valid
        pendingReset.forEach(reset => {
            if(reset.token == token){
                validTokenFound = true

                if(reset.isUsed == true){
                    return res.status(400).send('Reset password already done')

                }else if(reset.expiry > currentTime){  // check if expired or not
                    return res.status(200).send('Valid')

                }else{
                    return res.status(503).send('Reset password request expired')
                }
            }
        });

        if (!validTokenFound) {
            res.status(400).send('Bad request')
        }
    } catch (error) {
        console.log(error)
        res.status(400).send('Bad request')
    }
})



// ------------------------ Admin ----------------------------

// app.get('/admin')

app.get('/admin/dashboard', async (req, res) => {
    console.log('dashboard data requested')
    const accountId = res.locals.accountId as string
    const data = await mongoApi.getDashboardData(accountId)
    if (data != null) {
        res.status(200).send(data)
    } else {
        res.status(500).send('Server error')
    }
})

app.get('/admin/updateProfile', async (req, res) => {
    console.log('profile data requested')
    const accountId = res.locals.accountId as string
    const data = await mongoApi.getUpdateProfileData(accountId)
    if (data != null) {
        res.status(200).send(data)
    } else {
        res.status(404).send('Not found')
    }
})

app.get('/admin/updateProduct/:product_id', async (req, res) => {
    console.log('product data requested')

    try {
        const accountId = res.locals.accountId as string
        if (!await mongoApi.isAdmin(accountId)) {
            res.status(400).send('You are not the admin. Only the admin can do this type of request.')
            return
        }

        const data = await mongoApi.getUpdateProductData(req.params.product_id)
        if (data != null) {
            res.status(200).send(data)
        } else {
            res.status(404).send('Not found')
        }
    } catch (error) {
        console.log(error)
        res.status(400).send('Bad request')
    }
})


app.delete('/admin/deleteProduct/:product_id', async (req, res) => {
    console.log('delete product data requested')

    try {
        const accountId = res.locals.accountId as string
        if (!await mongoApi.isAdmin(accountId)) {
            res.status(400).send('You are not the admin. Only the admin can do this type of request.')
            return
        }

        const data = await mongoApi.deleteProject(req.params.product_id)
        if (data != null) {
            res.status(200).send('Successfully deleted')
        } else {
            res.status(404).send('Not found')
        }
    } catch (error) {
        console.log(error)
        res.status(400).send('Bad request')
    }
})



app.put('/admin/updateProfile', async (req, res) => {
    console.log('update profile data requested')

    try {
        const accountId = res.locals.accountId as string
        const data = await mongoApi.updateProfile(accountId, req.body.data as AccountUpdateData)
        if (data != null) {
            res.status(200).send('')
        } else {
            res.status(404).send('Not found')
        }
    } catch (error) {
        console.log(error)
        res.status(400).send('Bad request')
    }

})


app.put('/admin/updateProduct', async (req, res) => {
    console.log('update product data requested')

    try {
        const accountId = res.locals.accountId as string
        if (!await mongoApi.isAdmin(accountId)) {
            res.status(400).send('You are not the admin. Only the admin can do this type of request.')
            return
        }

        const data = await mongoApi.updateProject(req.body.data as ProductData)
        if (data != null) {
            res.status(200).send('')
        } else {
            res.status(404).send('Not found')
        }
    } catch (error) {
        console.log(error)
        res.status(400).send('Bad request')
    }

})

app.post('/admin/addProduct', async (req, res) => {
    try {
        const accountId = res.locals.accountId as string
        if (!await mongoApi.isAdmin(accountId)) {
            res.status(400).send('You are not the admin. Only the admin can do this type of request.')
            return
        }

        const productData = req.body.productData as ProductData
        productData._id = generateId()
        if (productData.dashIconUrl == '') {
            productData.dashIconUrl = '/public/uploads/no_image.png'
        }

        if (productData.landingImageUrl == '') {
            productData.landingImageUrl = '/public/uploads/no_image.png'
        }

        const data = await mongoApi.addProject(productData)

        if (data != null) {
            res.status(200).send({ status: 200 })
        } else {
            res.status(400).send('Bad request')
        }

        console.log('add product request')
    } catch (error) {
        console.log(error)
        res.status(400).send('Bad request')
    }
})


app.post('/admin/upload', upload.single('image'), async (req, res) => {
    console.log('upload image request')
    try {

        if (req.file == undefined) {
            res.status(400).send('Unable to upload')
        } else {

            // delete previous uploaded file, if found
            if (req.body.prevImageName != '') {
                const fileUrl = uploadLoc + '/' + req.body.prevImageName
                try {
                    if (req.body.prevImageName != 'no_image.png' && fs.existsSync(fileUrl)) {    // check file exist or not
                        fs.unlinkSync(fileUrl)       // delete the file
                    }

                } catch (error) {
                    console.log('File not found')
                }
            }

            res.status(200).send({ url: uploadLoc  + '/' + req.file!!.filename })
        }


    } catch (error) {
        console.log(error)
        res.status(400).send('Bad request')
    }
})

app.put('/admin/approveMember', async (req, res) => {

    console.log('approve user requested')
    try {
        const adminId = res.locals.accountId as string
        const isApproved = req.body.isApproved as boolean
        const memberId = req.body.memberId as string

        if (!await mongoApi.isAdmin(adminId)) {
            res.status(400).send('You are not the admin. Only the admin can do this type of request.')
            return
        }

        const data = await mongoApi.approveMember(memberId, isApproved)
        if (data != null) {
            res.status(200).send('')
        } else {
            res.status(404).send('Not found')
        }
    } catch (error) {
        console.log(error)
        res.status(400).send('Bad request')
    }

})


app.put('/admin/approvePublic', async (req, res) => {

    console.log('approve public requested')
    try {
        const adminId = res.locals.accountId as string
        const isPublic = req.body.isPublic as boolean
        const memberId = req.body.memberId as string

        if (!await mongoApi.isAdmin(adminId)) {
            res.status(400).send('You are not the admin. Only the admin can do this type of request.')
            return
        }

        const data = await mongoApi.approvePublic(memberId, isPublic)
        if (data != null) {
            res.status(200).send('')
        } else {
            res.status(404).send('Not found')
        }
    } catch (error) {
        console.log(error)
        res.status(400).send('Bad request')
    }

})




// ---------------------- public requests -------------------

app.get('/product/:product_id', async (req, res) => {
    console.log('Requested product page data')
    const data = await mongoApi.getProductPageData(req.params.product_id)
    if (data != null) {
        res.status(200).send(data)
    } else {
        res.status(404).send('Not found')
    }
})

app.get('/privacy/:product_id', async (req, res) => {
    console.log('Requested product privacy page data')
    const data = await mongoApi.getProductPrivacyPageData(req.params.product_id)
    if (data != null) {
        res.status(200).send(data)
    } else {
        res.status(404).send('Not found')
    }
})

app.get('/profile/:user_id', async (req, res) => {
    console.log('Requested product privacy page data')
    const data = await mongoApi.getProfilePageData(req.params.user_id)
    if (data != null) {
        res.status(200).send(data)
    } else {
        res.status(404).send('Not found')
    }
})

app.get('/home', async (req, res) => {
    console.log('Requested home page data')
    const data = await mongoApi.getHomePageData()
    if (data != null) {
        res.status(200).send(data)
    } else {
        res.status(404).send('Not found')
    }
})

app.get('/public/uploads/:filename', async (req, res) => {
    const dirPath = uploadLoc + '/'

    console.log('Requested image: ' + dirPath + req.params.filename)

    if (fs.existsSync(dirPath + req.params.filename)) {
        res.sendFile(dirPath + req.params.filename)
    } else {
        res.sendFile(dirPath + 'no_image.png')
    }
})


app.get('/sitemap', async(req, res) => {
    console.log('Requested home page data')
    const data = await mongoApi.getSitemapData()
    if (data != null) {
        res.status(200).send(data)
    } else {
        res.status(400).send('bad request')
    }

})



app.get('/', async function (req, res) {

    res.send('Hello welcome back')
})





app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})