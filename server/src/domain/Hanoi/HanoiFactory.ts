import { v4 } from'uuid'
import HanoiLogic from './HanoiLogic';
import { HanoiData } from './HanoiTypes';

export default class HanoiFactory extends HanoiLogic{

    static create(){
        return new HanoiFactory({
            id: v4(),
            players: [],
            bestTime: 0,
            rods: [[5, 4, 3, 2, 1], [], []],
            startTime: null,
            turn: 0,
        });
    }
    
    static hydrate(data: Omit<HanoiData, 'eventStack'>){
        return new HanoiFactory({
            ...data
        });
    }
    
}