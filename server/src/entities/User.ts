import { v4 } from 'uuid'

export interface matchHistory{

}

export interface UserData{
    email: string;
    name: string;
    password: string;
    description: string;
    history: matchHistory[];
}

export default class User implements UserData{
    email: string;
    name: string;
    description: string;
    history: matchHistory[];
    password: string;

    constructor(data: UserData){
        this.email = data.email;
        this.name = data.name;
        this.password = data.password;
        this.description = data.description;
        this.history = data.history;
    }

    
    static create(name: string, email: string, password: string){
        return new User({
            name,
            email,
            password,
            description: '',
            history: [],
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
        }
    }

}