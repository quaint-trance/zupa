import Token from "../domain/entities/Token";
import { ContestStore as ContestRepo } from "../types/ContestStore";
import bcrypt from 'bcryptjs'

import Contest from '../domain/Contest';
import PasswordSerive from "../domain/PasswordSerivce";

export default class ContestService{
   
    contestRepo: ContestRepo;

    constructor(infra: {contestRepo: ContestRepo}){
        this.contestRepo = infra.contestRepo
    }
    
    async createContest(game: string, ends: Date, description: string, higherBetter: boolean){
        const contest = Contest.create({game, ends, description, higherBetter});
        return await this.contestRepo.save(contest);
    }


    async getContest(id: string){
        const contest = await this.contestRepo.findById(id);
        if(!contest) return null;
        
        return contest.getAll();
    }

    async getIdsByGame(game: string){
        const contest = await this.contestRepo.findByGame(game);
        
        return contest ? contest : [];
    }

    async newScore(id: string, userId: string, value: number){
        const contest = await this.contestRepo.findById(id);
        if(!contest) return null;
        
        contest.newScore(userId, value);
        this.contestRepo.save(contest);
    }

}