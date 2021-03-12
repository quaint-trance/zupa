import { hasUncaughtExceptionCaptureCallback } from 'process';
import { v4 } from'uuid'
import CharadesLogic from './CharadesLogic';
import { CharadesData } from './CharadesTypes'



export default class CharadesFactory extends CharadesLogic{

    static create(timeouts:number[] = [60, 60, 45, 15]){
        return new CharadesFactory({
            id: v4(),
            drawing: -1,
            players: [],
            canvas: [],
            charade: 'initial',
            roundId: v4(),
            timeouts: timeouts,
        });
        
    }

    static hydrate(data: Omit<CharadesData, 'eventStack'>){
        return new CharadesFactory({
            ...data
        });
    }

}