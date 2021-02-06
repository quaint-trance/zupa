import { UserData } from "../../entities/User";
import { UserStore } from "../../types/UserStore";
import User from './models/User'

export default class userStore implements UserStore{
    
    store: UserData[]

    constructor(){
        this.store = [];
    }
    
    async create(data: UserData){
        console.log(data);
        const user = new User({
            ...data
        });

        try{
            await user.save();
        }catch(err){
            console.log(err)
        }
        
        return true;
    }

    async findByEmail(email: string){
        const user = await User.findOne({email});
        if(!user) return null;
        return {
            ...user,
        };
    }

    async findByName(name: string){
        const result = await User.findOne({name});
        if(!result) return null;
        let user = {
            name: result.name,
            email: result.name,
            history: result.history,
            password: result.password,
            description: result.description,
            music: result.music,
            gameSettings: result.gameSettings
        }
        return user;
    }

    async save(data: UserData){
        console.log(data);
        try{
            await User.updateOne({name: data.name}, {...data });
            //await User.updateOne({name: data.name}, {history: data.history });
            return true;
        }catch(err){
            console.log(err);
            return false;
        }
    }

}