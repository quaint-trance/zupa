import Token from "../domain/entities/Token";
import { UserStore as UserRepo } from "../types/UserStore";
import bcrypt from 'bcryptjs'
import { Game } from "../types/GameStore";

import User from '../domain/User';
import PasswordSerive from "../domain/PasswordSerivce";

export default class UserService{
   
    userRepo: UserRepo;

    constructor(infra: {userRepo: UserRepo}){
        this.userRepo = infra.userRepo
    }
    
    async createUser(name: string, email: string, password: string){
        if( await this.userRepo.findByEmail(email) || await this.userRepo.findByName(name) ) return null;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = User.create(name, email, hashedPassword);
        return await this.userRepo.save(user);
    }

    async updateUser(token: string, data: any){
        const name = Token.hydrate(token).getPayload().name;
        if(!name) return;
        const user = await this.userRepo.findByName(name);
        if(!user) return;

        const propsToChange: ['description', 'music'] = ['description','music'];
        propsToChange.forEach(prop=>{
            if(!data[prop]) return;
            user[prop] = data[prop];
        });

        this.userRepo.save(user);
        return true;
    }

    async checkPassword(password: string, email?: string, name?: string){
        let user;
        if(name) user = await this.userRepo.findByName(name);
        else if(email) user = await this.userRepo.findByName(email);
        if(!user) return null
        
        if( await PasswordSerive.validate(password, user.getHash() ) ) return user;
        return null;
    }

    async getToken(password: string, email?: string, name?: string){
        const user = await this.checkPassword(password, email, name);
        if(!user) return null;
        const token = Token.create({ name: user.getName() });
        return token;
    }

    async getUser(name: string){
        const user = await this.userRepo.findByName(name);
        if(!user) return null;
        
        return user.getPublicInfo();
    }

    async addHistory(){ //TODO
        
    }

}