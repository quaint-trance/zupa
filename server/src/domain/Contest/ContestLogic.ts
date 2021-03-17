import { v4 } from "uuid";
import ContestFrame from "./ContestFrame";

export default class ContestLogic extends ContestFrame{
    
    public newScore(userId: string, value: number){
        if(this.scoreboard.some(r=>r.userId===userId)) this.scoreBeaten(userId, value);
        else this.scoreAchieved(userId, value);
    }

    protected scoreAchieved(userId: string, value: number){
        this.scoreboard.push({
            id: v4(),
            score: value,
            userId,
        });
    }

    protected scoreBeaten(userId: string, value: number){
        const record = this.scoreboard.find(r=>r.userId===userId);
        if(!record) return null;
        if( this.higherBetter && record.score >= value ) return null;
        if( !this.higherBetter && record.score <= value ) return null;

        record.score = value;
    }

}