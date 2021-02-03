import { UserData } from "../../entities/User";
import { UserStore } from "../../types/UserStore";
import User from './models/User'

export default class userStore implements UserStore{
    
    store: UserData[]

    constructor(){
        this.store = [];
    }
    
    async create(data: UserData){
        const user = new User({
            ...data
        });

        try{
            await user.save();
        }catch(err){
            console.log(err)
        }
        
        this.log();
        return true;
    }

    async findByEmail(email: string){
        const user = await User.findOne({email});
        if(!user) return null;
        return user;
    }

    async findByName(name: string){
        const result = await User.findOne({name});
        if(!result) return null;
        let user:UserData = {
            description: result.description,
            email: result.email,
            history: result.history,
            password: result.password,
            name: result.name,
        }
        return user;
    }

    async save(data: UserData){
        try{
            User.updateOne({name: data.name}, {...data});
            return true;
        }catch(err){
            console.log(err);
            return false;
        }
    }

    log(){
        console.log(this.store);
    }
}