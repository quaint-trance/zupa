import { kStringMaxLength } from "buffer";
import { ContestData, Record } from "./ContestTypes";

export default class ContestFrame{
    protected id: ContestData['id'];
    protected ends: ContestData['ends'];
    protected scoreboard: ContestData['scoreboard']
    protected game: ContestData['game'];
    protected description: ContestData['description']
    protected higherBetter: ContestData['higherBetter']
    protected ended: ContestData['ended']

    protected constructor(data: ContestData){
        this.id = data.id;
        this.ends = data.ends;
        this.scoreboard = data.scoreboard;
        this.game = data.game;
        this.description = data.description;
        this.higherBetter = data.higherBetter;
        this.ended = data.ended;
    }

    getScoreboard(){
        return this.scoreboard
            .sort((a, b)=>{
                return this.higherBetter ? b.score - a.score : a.score - b.score;
            });
    }

    getId(){
        return this.id;
    }

    getEnds(){
        return this.ends;
    }

    isActive(){
        return !this.ended;
    }

    getAll(): ContestData{
        return{
            id: this.id,
            description: this.description,
            ended: this.ended,
            ends: this.ends,
            game: this.game,
            higherBetter: this.higherBetter,
            scoreboard: this.scoreboard,
        }
    }




}