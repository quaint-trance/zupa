import mongoose from 'mongoose';
import { SkinData } from '../../../domain/Skin';

export interface ISkin extends mongoose.Document{
    id: string,
    value: string,
}

let __in:ISkin;
//@ts-ignore
__in = {};
const __ensureValidScheme:SkinData = __in;

const userSchema = new mongoose.Schema({
    id:{
        required: true,
        type: String,
        unique: true,
        _id: true,
    },
    value:{
        required: true,
        type: String,
    }
});

export default mongoose.model<ISkin>('Skin', userSchema);