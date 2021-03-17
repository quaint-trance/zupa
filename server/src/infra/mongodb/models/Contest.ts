import mongoose from 'mongoose';
import { ContestData, Record } from '../../../domain/Contest';

export interface IContest extends mongoose.Document{
    id: string;
    ends: Date;
    ended: boolean;
    scoreboard: Record[];
    game: string;
    description: string;
    higherBetter: boolean;
}

let __in:IContest;
//@ts-ignore
__in = {};
const __e = ((arg: ContestData)=>{})(__in)

const contestSchema = new mongoose.Schema({
        id:{
            type: String,
            required: true
        },
        ends:{
            type: Date,
            required: true
        },
        ended:{
            type: Boolean,
            required: true,
        },
        scoreboard:{
            required: true,
            type:[{
                id: String,
                userId: String,
                score: Number,
            }]
        },
        game: String,
        description: String,
        higherBetter: Boolean,
});

export default mongoose.model<IContest>('U', contestSchema);