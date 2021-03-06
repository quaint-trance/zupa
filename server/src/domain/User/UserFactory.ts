import UserLogic from "./UserLogic";
import { UserData } from "./UserTypes";

export default class UserFactory extends UserLogic{
    static create(name: string, email: string, password: string){

        if(!name || !email || !password) throw new Error('create User: invalid props');

        return new UserFactory({
            name,
            email,
            password,
            description: '',
            history: [],
            music: '',
            gameSettings:{
                connect4:{
                    skin: '',
                    unlocked: []
                },
            }
        })
    }

    static hydrate(data: UserData){
        return new UserFactory(data);
    }
}