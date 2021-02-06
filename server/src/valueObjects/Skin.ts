import { v4 } from 'uuid'
import { SkinStore } from '../types/SkinStore';

export interface SkinData{
    id: string;
    value: string;
}

function SkinFactory(skinStore: SkinStore){
    return class Skin{
        private id: string;
        private value: string;
        
        constructor(data: SkinData){
            this.id = data.id;
            this.value = data.value;
        }
        
        static async get(id: string){
            const skin = await skinStore.findById(id);
            if(!skin) return null;
            return new Skin(skin);
        }

        static async create(value: string){
            const skin = new Skin({
                id: v4(),
                value,
            });
            const result = await skinStore.save(skin.getData());
            if(!result) return null;
            return skin;
        }

        getValue(){
            return this.value;
        }

        getId(){
            return this.getId;
        }

        getData(){
            return{
                id: this.id,
                value: this.value
            }
        }

    }
}

export default SkinFactory;
export type SkinType = ReturnType<typeof SkinFactory>