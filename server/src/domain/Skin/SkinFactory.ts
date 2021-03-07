import { v4 } from 'uuid';
import { SkinData } from './SkinTypes';
import SkinLogic from './SkinLogic'

export default class SkinFactory extends SkinLogic{

    static async create(value: string){
        return new SkinFactory({
            id: v4(),
            value,
        });
    };

    static async hydrate(data: SkinData){
        return new SkinFactory(data);
    }

}