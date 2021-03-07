import { SkinStore } from "../../types/SkinStore";
import SkinModel from '../mongodb/models/Skin'
import Skin from '../../domain/Skin'

export default class skinStore implements SkinStore{
    
    store: Skin[];

    constructor(){
        this.store = [];
    }
    
    async create(data: Skin){
        const skin = new SkinModel({
            ...data
        });

        try{
            await skin.save();
        }catch(err){
            console.log(err)
            return false;
        }
        
        return true;
    }

    async findById(id: string){
        const result = await SkinModel.findOne({id});
        if(!result) return null;
        return Skin.hydrate(result);
    }

    async save(skin: Skin){
        const data = skin.getAll();
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
        const changed =  result.map(el=>Skin.hydrate(el));
        return Promise.all(changed);
    }

}