import mongoose from "mongoose";
import { Account, Product, RejectedAccount } from "./Model.js";
import { AccountBasicData, AccountDashboardData, AccountData, AccountPublicData, AccountSmallData, AccountUpdateData, DashboardData, HomePageData, ProductBasicData, ProductDashboardData, ProductData, ProductPageData, ProductPrivacyPageData, ProfilePageData, SitemapData } from "./DataType.js";

export default class MongoAPI {

    async connectMongoose(url: string) {
        var isConnected = false
        await mongoose.connect(url)
            .then(() => {
                isConnected = true
                console.log('Connected to MongoDB');
            })
            .catch((error) => {
                console.error('Error connecting to MongoDB:', error);
            });

        return isConnected
    }







    // ------------------ Account -------------------

    async isAdmin(accountId: string) {
        try {
            const account = await Account.findById(accountId)
            if (account == null) return false
            if (account.role == 'CEO' || account.role == 'CO') return true

        } catch (error) {
            console.log(error)
        }

        return false
    }

    async isAccountExist(accountId: string) {
        try {
            const account = await Account.findById(accountId)
            if (account != null) return true

        } catch (error) {
            console.log(error)
        }

        return false
    }

    async getAccount(email: string) {
        try {
            const account = await Account.findOne({ email: email });
            console.log("fetch account")
            return account;

        } catch (error) {
            console.error('Error in account:', error);
            return null
        }
    }

    async createAccount(accountData: AccountData) {
        try {
            const account = await Account.create(accountData)
            console.log("create account")
            return account

        } catch (error) {
            console.error('Error in account:', error);
            return null
        }
    }

    async resetAccountPassword(accountId: string, newPassword: string) {
        try {
            const account = await Account.findByIdAndUpdate(accountId, { password: newPassword })
            console.log("reset account password")
            return account

        } catch (error) {
            console.error('Error in account:', error);
            return null
        }
    }



    // ----------------------- Dashboard ---------------------

    async getDashboardData(accountId: string) {
        try {
            const profile = await Account.findById(accountId) as AccountData | null

            if (profile == null) return null
            profile!!.password = ''

            let products = Array<ProductDashboardData>()
            let accounts = Array<AccountDashboardData>()

            // send data only when user is approved
            if (profile.isApproved) {
                products = await Product.find().select('_id name dashIconUrl dashDescription dashPlatform dashTeamLead dashStartedAt dashCompletedAt dashStatus') as Array<ProductDashboardData>
                accounts = await Account.find().select('_id firstName lastName profileImage role expertIn projects joinedAt isPublic isApproved') as Array<AccountDashboardData>
            }

            const data: DashboardData = {
                members: accounts,
                products: products,
                profile: profile
            }

            return data
        } catch (error) {
            console.error('Error in account:', error);
            return null
        }
    }


    async updateProfile(accountId: string, data: AccountUpdateData) {
        try {
            const account = await Account.findByIdAndUpdate(accountId, data)
            return account
        } catch (error) {
            console.error('Error in account:', error);
            return null
        }

    }

    async getUpdateProductData(productId: string) {
        try {
            return await Product.findById(productId).select('-__v') as ProductData | null
        } catch (error) {
            console.error('Error in product:', error);
            return null
        }
    }

    async getUpdateProfileData(accountId: string) {
        try {
            const account = await Account.findById(accountId).select('-_id -__v -email -role -joinedAt -isPublic -isApproved') as AccountUpdateData | null
            return account
        } catch (error) {
            console.error('Error in account:', error);
            return null
        }
    }


    async deleteProject(productId: string) {
        try {
            const project = await Product.findByIdAndDelete(productId)
            return project
        } catch (error) {
            console.error('Error in account:', error);
            return null
        }
    }

    async addProject(productData: ProductData) {
        try {
            const project = await Product.create(productData)
            return project
        } catch (error) {
            console.error('Error in account:', error);
            return null
        }
    }


    async updateProject(productData: ProductData) {
        try {
            const product = await Product.findByIdAndUpdate(productData._id, productData)
            return product
        } catch (error) {
            console.error('Error in account:', error);
            return null
        }
    }

    async approveMember(memberId: string, isApproved: boolean) {
        try {
            let account: null | AccountData = null

            if (isApproved) { // approving the account
                account = await Account.findByIdAndUpdate(memberId, { isApproved: true })

            } else {   // add to reject list
                account = await Account.findByIdAndDelete(memberId)
                if (account != null) {
                    await RejectedAccount.create(account)
                }
            }

            return account
        } catch (error) {
            console.error('Error in account:', error);
            return null
        }
    }

    async approvePublic(memberId: string, isPublic: boolean) {
        try {
            let account = await Account.findByIdAndUpdate(memberId, { isPublic: isPublic })
            return account
        } catch (error) {
            console.error('Error in account:', error);
            return null
        }
    }



    // -------------------------- public requests ---------------------

    async getProductPageData(productId: string) {
        try {
            const product = await Product.findById(productId).select('_id name landingDescription landingImageUrl playStoreUrl productSeoTitle productSeoDesc productAboutDesc productAboutEndDesc productFeatures') as ProductPageData | null
            return product
        } catch (error) {
            console.error('Error in product:', error);
            return null
        }
    }

    async getProductPrivacyPageData(productId: string) {
        try {
            const product = await Product.findById(productId).select('_id name landingDescription playStoreUrl privacySeoDescription privacyAboutDesc') as ProductPrivacyPageData | null
            return product
        } catch (error) {
            console.error('Error in product:', error);
            return null
        }
    }

    async getProfilePageData(accountId: string) {
        try {
            const account = await Account.findById(accountId).select('-password -mode -projects -__v -isPublic -isApproved') as AccountPublicData | null
            if (account == null) return null
            const allAccounts = await Account.find({ _id: { $ne: accountId } }).select('_id firstName lastName profileImage expertIn') as AccountSmallData[]
            const profilePageData: ProfilePageData = {
                profile: account,
                members: allAccounts
            }
            return profilePageData
        } catch (error) {
            console.error('Error in account:', error);
            return null
        }
    }


    async getHomePageData() {
        try {
            const accounts = await Account.find({ isApproved: true, isPublic: true }).sort({ joinedAt: 1 }).select('_id firstName lastName profileImage role expertIn smallInfo') as AccountBasicData[]
            const products = await Product.find().select('_id name dashIconUrl dashDescription dashStatus') as ProductBasicData[]

            const homePageData: HomePageData = {
                members: accounts,
                products: products
            }
            return homePageData
        } catch (error) {
            console.error('Error in account:', error);
            return null
        }
    }


    async getSitemapData() {
        try {
            const accounts = await Account.find().select('_id')
            const products = await Product.find().select('_id')
            const sitemapData: SitemapData = {
                products: accounts as any as Array<string>,
                accounts: products as any as Array<string>
            }

            return sitemapData
        } catch (error) {
            console.error('sitemap error:', error);
            return null
        }
    }

}
