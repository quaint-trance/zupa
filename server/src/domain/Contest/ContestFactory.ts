import ContestLogic from "./ContestLogic";
import { ContestData } from "./ContestTypes";
import { v4 } from 'uuid'

export default class ContestFactory extends ContestLogic{

    static hydrate(data: ContestData){
        return new ContestFactory({
            ...data,
        })
    }

    static create(data:{game: string, description: string, ends: Date, higherBetter:boolean}){
        return new ContestFactory({
            id: v4(),
            description: data.description,
            ended: false,
            ends: data.ends,
            game: data.game,
            scoreboard: [],
            higherBetter: data.higherBetter
        })
    }

}