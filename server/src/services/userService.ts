import Token from "../domain/entities/Token";
import { UserStore } from "../types/UserStore";
import bcrypt from 'bcryptjs'
import { Game } from "../types/GameStore";
import { UserType } from '../domain/User/UserLogic';

export default class UserService{
   
    userStore: UserStore;
    User: UserType;

    constructor(userStore: UserStore, User: UserType){
        this.userStore = userStore,
        this.User = User;
    } 

    async createUser(name: string, email: string, password: string){
        if(await this.userStore.findByEmail(email) || await this.userStore.findByName(name)) return null;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = this.User.create(name, email, hashedPassword);
        return await this.userStore.create(user.getData());
    }

    async updateUser(token: string, data: any){
        console.log(token, data);
        const name = Token.hydrate(token).getPayload().name;
        if(!name) return;
        const userData = await this.userStore.findByName(name);
        if(!userData) return;
        const user = this.User.hydrate(userData);
        ["description", "music"].forEach(prop=>{
            if(!data[prop]) return;
            //@ts-ignore
            user[prop] = data[prop];
        });
        this.userStore.save(user.getData());
        console.log(true);
        return true;
    }

    async checkPassword(password: string, email?: string, name?: string){
        let user;
        if(name) user = await this.userStore.findByName(name);
        else if(email) user = await this.userStore.findByName(email);
        if(!user) return null
        
        if( await bcrypt.compare(password, user.password) ) return user;
        return null;
    }

    async getToken(password: string, email?: string, name?: string){
        const user = await this.checkPassword(password, email, name);
        if(!user) return null;
        const token = Token.create({ name: user.name });
        return token;
    }

    async getUser(name: string){
        const userData = await this.userStore.findByName(name);
        if(!userData) return null;
        const user = this.User.hydrate(userData);
        //await user.loadSkins();
        //await user.loadAllSkins();
        return{
            name: user.name,
            description: user.description,
            history: user.history,
            music: user.music,
            gameSettings: user.gameSettings
        }
    }

    async addHistory(type: Game['t'], payload: any, gameData: Game){
        if(gameData.t === 'connect4'){
            const winner = payload.userName || 'undefined';
            for(let player of gameData.players){
                if(!player.userName) return;
                const userData = await this.userStore.findByName(player.userName);
                if(!userData) return;
                console.log(userData);
                
                const user = this.User.hydrate(userData);
                user.pushHistory('connect4', winner);
                console.log(user.getData());
                this.userStore.save(user.getData());
            }
        }
    }

}