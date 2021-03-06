import { UserData, matchHistory } from './UserTypes'

export default class UserFrame{
    protected email: string;
    protected name: string;
    protected description: string;
    protected history: matchHistory[];
    protected password: string;
    protected music: string;
    protected gameSettings: UserData['gameSettings'];

    constructor(data: UserData){
        this.email = data.email;
        this.name = data.name;
        this.password = data.password;
        this.description = data.description;
        this.history = data.history;
        this.music = data.music;
        this.gameSettings = data.gameSettings;
    }
}