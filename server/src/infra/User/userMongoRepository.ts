import { UserData } from "../../domain/User/UserTypes";
import User from "../../domain/User"

import { UserStore } from "../../types/UserStore";
import UserModel from '../mongodb/models/User'

export default class userStore implements UserStore{
    
    /*async create(data: UserData){
        const user = new UserModel({
            ...data
        });

        try{
            await user.save();
        }catch(err){
            console.log(err)
        }
        
        return true;
    }*/

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

    async save(data: UserData){
        try{
            await UserModel.updateOne({name: data.name}, {...data });
            return true;
        }catch(err){
            console.log(err);
            return false;
        }
    }

}