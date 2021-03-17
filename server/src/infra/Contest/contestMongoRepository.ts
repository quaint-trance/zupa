import { ContestData } from "../../domain/Contest";
import Contest from "../../domain/Contest"

import { ContestStore } from "../../types/ContestStore";
import ContestModel from '../mongodb/models/Contest'

export default class contestStore implements ContestStore{
    
    async save(contest: Contest){
        const data = contest.getAll();
        const isInDb = await ContestModel.findOne({id: data.id});
        if(!isInDb) return this.create(contest);
        try{
            await ContestModel.updateOne({id: data.id}, {...data });
            return true;
        }catch(err){
            console.log(err);
            return false;
        }
    }

    async findById(id: string){
        const contestData = await ContestModel.findOne({id});
        if(!contestData) return null;
        return Contest.hydrate(contestData);
    }


    private async create(contest: Contest){
        const data = contest.getAll();

        const dbContest = new ContestModel({
            ...data,
        });

        try{
            await dbContest.save();
            return true;
        }
        catch(err){
            console.error(err);
            return false;
        }
    }

}