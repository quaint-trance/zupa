import { v4 } from 'uuid'
import { eventType } from '../../types/EventEmitter';
import calcScore from '../../utils/calcScoreYatzy';
import random from '../../utils/random';
import YatzyLogic from './YatzyLogic';
import { Player, yatzyData } from './YatzyTypes'

export default class YatzyFactory extends YatzyLogic{
    id: string;
    players: Player[];
    turn: number;
    throwCount: number;
    dice: number[];
    eventStack: eventType[];

    static create(){
        return new YatzyFactory({
            id: v4(),
            players: [],
            turn: -1,
            throwCount: 0,
            dice: [5, 5, 5, 5, 5],
        });
    }

    static hydrate(data: yatzyData){
        return new YatzyFactory({
            ...data
        });
    }

}