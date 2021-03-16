import { UserData } from "../../domain/User/UserTypes";
import User from "../../domain/User"

import { UserStore } from "../../types/UserStore";
import UserModel from '../mongodb/models/User'

export default class userStore implements UserStore{
    
    async findByEmail(email: string){
        const userData = await UserModel.findOne({email});
        if(!userData) return null;
        return User.hydrate(userData); 
    }

    async findByName(name: string){
        const userData = await UserModel.findOne({name});
        if(!userData) return null;
        return User.hydrate(userData);
    }

    async save(user: User){
        const data = user.getAll();
        const isInDb = await UserModel.findOne({name: data.name});
        if(!isInDb) return this.create(user);
        try{
            await UserModel.updateOne({name: data.name}, {...data });
            return true;
        }catch(err){
            console.log(err);
            return false;
        }
    }

    private async create(user: User){
        const data = user.getAll();

        const dbUser = new UserModel({
            ...data,
        });

        try{
            await dbUser.save();
            return true;
        }
        catch(err){
            console.error(err);
            return false;
        }
    }

}