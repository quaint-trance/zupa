import { v4 } from 'uuid'
import { UserData, matchHistory } from './UserTypes'
import UserFrame from './UserFrame'

export default class User extends UserFrame{
        
    pushHistory(type: string, winner: string){
        if(!this.history || this.history.length === 0)
            this.history=[{t: type, winner, date: (new Date()).toISOString()}];
        else this.history.push({t: type, winner, date: (new Date().toISOString())});
    }

    setSkin(skinId: string){
        this.gameSettings.connect4.skin = skinId;
    }

}

export type UserType = User;