import config from "../config/config";
import { Client, Account, ID } from "appwrite";

export class authService{
    Client = new Client()
    account
    constructor(){
        this.Client
                .setEndpoint(config.appwriteUrl)
                .setProject(config.appwriteProjectId)
        this.account = new Account(this.Client)
    }

    async createUserAccount({email,username,password}){
        try {
            const userAccount = await this.account.create( ID.unique(), email,username,password)
            //login directly if account created
            if (userAccount) {
                return this.login({email,password})
            } else {
                return userAccount
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email,password}){
        try {
            return await this.account.createEmailPasswordSession(email,password)
        } catch (error) {
            throw error
        }
    }

    async getAccountStatus(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log('getAccountStatus failed. Error: ', error);
        }

        return null
    }

    async logOut (){
        try {
            // return await this.account.deleteSession('current' or 'session_Id') //delete the current session
            return await this.account.deleteSessions() //logout from all devices
        } catch (error) {
            throw error
        }
    }
}

const auth = new AuthService()

export default auth