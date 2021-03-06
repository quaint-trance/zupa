import { v4 } from 'uuid'
import { SkinType } from '../entities/Skin';
import { UserData, matchHistory } from './UserTypes'
import UserFrame from './UserFrame'

export default class User extends UserFrame{
        
    getData():UserData{
        return {
            email: this.email,
            password: this.password,
            name: this.name,
            description: this.description,
            history: this.history,
            music: this.music,
            gameSettings: this.gameSettings,
        }
    }

    pushHistory(type: string, winner: string){
        if(!this.history || this.history.length === 0)
            this.history=[{t: type, winner, date: (new Date()).toISOString()}];
        else this.history.push({t: type, winner, date: (new Date().toISOString())});
    }

    setSkin(id: string){
        if(!this.gameSettings.connect4?.skin) return;
            this.gameSettings.connect4.skin = id;
    }

}

export type UserType = User;