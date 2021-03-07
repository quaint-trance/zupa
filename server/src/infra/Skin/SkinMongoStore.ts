import Skin from "../../domain/Skin";
import { SkinStore } from "../../types/SkinStore";
import SkinModel from '../mongodb/models/Skin'
import { SkinData } from '../../domain/Skin'

export default class skinStore implements SkinStore{
    
    store: Skin[];

    constructor(){
        this.store = [];
    }
    
    async create(data: Skin){
        const skin= new SkinModel({
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
        const result = await SkinModel.findOne({id});
        if(!result) return null;
        let user = {
            id: result.id,
            value: result.value,
        }
        return user;
    }

    async save(data: SkinData){
        try{
            await SkinModel.updateOne({id: data.id}, {...data });
            return true;
        }catch(err){
            console.log(err);
            return false;
        }
    }

    async getAll(){
        const result = await SkinModel.find();
        return result;
    }

}