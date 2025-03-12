import { Client, Account, ID } from "appwrite";
import conf from '../conf/conf'

export class Authservice {
    client = new Client();
    account = new Account(this.client);
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        console.log("authservice created and account looks like -->/n", this.account);
        
    }

    async createAccount(email, password , name) {
        try{
            await this.account.create(ID.unique(), email, password , name);
           await this.login(email, password);
            return true;
        }
        catch(e){
            console.log("Create Account Error", e);
            return e;
        }
    }
    async login(email, password ) {
        try{
            const session = await this.account.createEmailPasswordSession(email, password);
            console.log("Login Success");
            console.log(session);   
            return true;
        }
        catch(e){
            console.log("Login Error", e);
            return e;
        }
    }

    async getCurrentUser() {
        try{
            const user = await this.account.getSession("current");
            console.log("Get Current User Success");
            console.log(user);
            return user;
        }
        catch(e){
            console.log("Get Current User Error inside auth,js \n", e);
        }
    }

    async logout() {
        try{
            await this.account.deleteSessions();
            return true;
        }
        catch(e){
            console.log("Logout Error", e);
            return e;
        }
    }
}

const authservice = new Authservice();
export default authservice