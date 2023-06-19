import mongoose from "mongoose";
import { Account, Product } from "./Model.js";
import { AccountBasicData, AccountData, DashboardData, ProductBasicData, ProductData, ProductPageData, ProductPrivacyPageData } from "./DataType.js";

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
            const profile = await Account.findById(accountId)

            if (profile == null) return null
            profile!!.password = ''

            const products = await Product.find().select('_id name dashIconUrl dashDescription dashPlatform dashTeamLead dashStartedAt dashCompletedAt dashStatus') as Array<ProductBasicData>
            const accounts = await Account.find().select('_id firstName lastName profileImage role projects joinedAt') as Array<AccountBasicData>

            const data: DashboardData = {
                members: accounts,
                products: products,
                profile: profile as AccountData
            }

            return data
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
            const product = await Product.create(productData)
            return product
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
            console.error('Error in account:', error);
            return null
        }
    }

    async getProductPrivacyPageData(productId: string) {
        try {
            const product = await Product.findById(productId).select('_id name landingDescription playStoreUrl privacySeoDescription privacyAboutDesc') as ProductPrivacyPageData | null
            return product
        } catch (error) {
            console.error('Error in account:', error);
            return null
        }
    }

}
