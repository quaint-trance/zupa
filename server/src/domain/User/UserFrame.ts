import { UserData, matchHistory } from './UserTypes'

export default class UserFrame{
    protected email: string;
    protected name: string;
    protected description: string;
    protected history: matchHistory[];
    protected password: string;
    protected music: string;
    protected gameSettings: UserData['gameSettings'];

    protected constructor(data: UserData){
        this.email = data.email;
        this.name = data.name;
        this.password = data.password;
        this.description = data.description;
        this.history = data.history;
        this.music = data.music;
        this.gameSettings = data.gameSettings;
    }

    public getAll():UserData{
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

    public getHash(){
        return this.password;
    }

    public getName(){
        return this.name;
    }

    public getPublicInfo(){
        return {
            name: this.name,
            description: this.description,
            history: this.history,
            music: this.music,
            gameSettings: this.gameSettings
        }
    }

}