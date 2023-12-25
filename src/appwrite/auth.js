import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

//created a class to export, and a constructor so that it initializes whenever an object is created for better code practices
export class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    //method to be independent of appwrite

    async createAccount({email,password,name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount){
                //call another method if userAccount exists the login the user
                return this.login(email,password)
            }else{
                return userAccount
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email,password}){
        try{
            return await this.account.createEmailSession(email,password);
        }
        catch(error){
            throw error;
        }
    }

    async getCurrentUser(){
        try{
            return this.account.get()
        }catch(error){
            throw error;
        }
        return null;
    }

    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            throw error;
            
        }
    }
}

const authService = new AuthService();

export default authService