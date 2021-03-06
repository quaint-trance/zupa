import { SkinData } from "../../domain/entities/Skin";
import { UserData } from "../../domain/User/UserLogic";
import { SkinStore } from "../../types/SkinStore";
import Skin from './models/Skin'

export default class skinStore implements SkinStore{
    
    store: UserData[]

    constructor(){
        this.store = [];
    }
    
    async create(data: SkinData){
        const skin= new Skin({
            ...data
        });

        try{
            await skin.save();
        }catch(err){
            console.log(err)
        }
        
        return true;
    }

    async findById(id: string){
        const result = await Skin.findOne({id});
        if(!result) return null;
        let user = {
            id: result.id,
            value: result.value,
        }
        return user;
    }

    async save(data: SkinData){
        try{
            await Skin.updateOne({id: data.id}, {...data });
            return true;
        }catch(err){
            console.log(err);
            return false;
        }
    }

    async getAll(){
        const result = await Skin.find();
        return result;
    }

}