import { v4 } from 'uuid'
import { SkinType } from '../valueObjects/Skin';

export interface matchHistory{
    t: string, 
    winner: string,
    date: string;
}

export interface UserData{
    email: string;
    name: string;
    password: string;
    description: string;
    history: matchHistory[];
    music: string;
    gameSettings:{
        connect4?:{
            skin?:string,
            unlocked:string[]
        }
    }
}

function UserFactory(Skin: SkinType){
    return class User implements UserData{
        email: string;
        name: string;
        description: string;
        history: matchHistory[];
        password: string;
        music: string;
        gameSettings: UserData['gameSettings'];

        constructor(data: UserData){
            this.email = data.email;
            this.name = data.name;
            this.password = data.password;
            this.description = data.description;
            this.history = data.history;
            this.music = data.music;
            this.gameSettings = data.gameSettings;
        }

        
        static create(name: string, email: string, password: string){
            return new User({
                name,
                email,
                password,
                description: '',
                history: [],
                music: '',
                gameSettings:{
                    connect4:{
                        unlocked: []
                    },
                }
            })
        }

        static hydrate(data: UserData){
            return new User(data);
        }

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

        async loadSkins(){
            if(this.gameSettings.connect4?.skin){
                const skin = await Skin.get(this.gameSettings.connect4.skin);
                if(!skin) return;
                this.gameSettings.connect4.skin = skin.getValue(); 
            }
        }

        async loadAllSkins(){
            if(!this.gameSettings.connect4?.unlocked) return null;
            this.gameSettings.connect4.unlocked = await Promise.all(this.gameSettings.connect4.unlocked.map(async skinId=>{
                const skin = await Skin.get(skinId);
                if(!skin) return '';
                return skin.getValue();
            }));
        }
        
        setSkin(id: string){
            if(!this.gameSettings.connect4?.skin) return;
            this.gameSettings.connect4.skin = id;
        }
    }
}

export default UserFactory;
export type UserType = ReturnType<typeof UserFactory>