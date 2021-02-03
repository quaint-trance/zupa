import { Namespace } from "socket.io";
import Token from "../entities/Token";
import User from "../entities/User";
import { UserStore } from "../types/UserStore";
import bcrypt from 'bcryptjs'

export default class UserService{
   
    userStore: UserStore;

    constructor(userStore: UserStore){
        this.userStore = userStore
    } 

    async createUser(name: string, email: string, password: string){
        if(await this.userStore.findByEmail(email) || await this.userStore.findByName(name)) return null;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = User.create(name, email, hashedPassword);
        return await this.userStore.create(user.getData());
    }

    async checkPassword(password: string, email?: string, name?: string){
        let user;
        if(name) user = await this.userStore.findByName(name);
        else if(email) user = await this.userStore.findByName(email);
        if(!user) return null
        
        if( await bcrypt.compare(password, user.password) ) return user;
        return null;
    }

    async getToken(password: string, email?: string, name?: string){
        const user = await this.checkPassword(password, email, name);
        if(!user) return null;
        const token = Token.create({ name: user.name });
        return token;
    }

    async getUser(name: string){
        const user = await this.userStore.findByName(name);
        if(!user) return null;
        else return{
            name: user.name,
            description: user.description,
            history: user.history,
        }
    }

}