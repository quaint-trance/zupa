import User from "./User";
import { UserData } from "./UserTypes";

export default class UserFactory extends User{
    static create(name: string, email: string, password: string){

        if(!name || !email || !password) throw new Error('create User: invalid props');

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
}