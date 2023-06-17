import mongoose from "mongoose";
import { Account, Project } from "./Model.js";
import { AccountBasicData, AccountData, DashboardData, ProjectData } from "./DataType.js";

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

    async isAccountExist(accountId: string){
        try {
            const account = await Account.findById(accountId)
            if(account != null) return true

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

    async getDashboardData(accountId: string){
        try {
            const profile = await Account.findById(accountId)

            if(profile == null) return null
            profile!!.password = ''

            const projects = await Project.find() as Array<ProjectData>
            const accounts = await Account.find().select('_id firstName lastName profileImage role projects joinedAt') as Array<AccountBasicData>

            const data: DashboardData = {
                members: accounts,
                projects: projects,
                profile: profile as AccountData
            }

            return data

        } catch (error) {
            console.error('Error in account:', error);
            return null
        }
    }

}
