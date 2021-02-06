import mongoose from 'mongoose';
import { matchHistory, UserData } from '../../../entities/User';

export interface IUser extends mongoose.Document{
    name: string,
    email: string,
    password: string,
    description: string,
    history: matchHistory[],
    music: string,
    gameSettings:{
        connect4?:{
            skin?: string,
            unlocked: string[],
        }
    }
}

let __in:IUser;
//@ts-ignore
__in = {};
const __e = ((arg: UserData)=>{})(__in)

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    description:{
        type: String
    },
    password:{
        type: String,
        required: true
    },
    history:[{
        t: String,
        winner: String,
        date: String,
    }],
    music: String,
    gameSettings:{
        connect4:{
            skin: String,
            unlocked: [String]
        }
    }
});

export default mongoose.model<IUser>('User', userSchema);