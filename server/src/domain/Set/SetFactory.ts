import { v4 } from'uuid'
import genDeck from '../../utils/genDeck';
import SetLogic from './SetLogic';
import { SetData } from './SetTypes';

export default class SetFactory extends SetLogic{

    static create(shuffle?:boolean){
        return new SetFactory({
            id: v4(),
            players: [],
            table: [],
            deck: genDeck(shuffle),
        });
    }
    
    static hydrate(data: Omit<SetData, 'eventStack'>){
        return new SetFactory({
            ...data
        });
    }
    
}