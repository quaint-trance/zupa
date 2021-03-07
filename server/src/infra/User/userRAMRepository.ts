import User  from "../../domain/User";
import { UserData }  from "../../domain/User/UserTypes";
import { UserStore } from "../../types/UserStore";

export default class userStore implements UserStore{
    
    store: UserData[]

    constructor(){
        this.store = [];
    }
    
    async create(data: UserData){
        this.store.push(data);
        this.log();
        return true;
    }

    async findByEmail(email: string){
        const result = this.store.find(e=>e.email === email);
        return result ? User.hydrate(result) : null;
    }

    async findByName(name: string){
        const result = this.store.find(e=> e.name === name);
        return result ? User.hydrate(result) : null;
    }

    async save(data: UserData){
        const index = this.store.findIndex(e=> e.name === data.name);
        if(index === -1) return false;
        this.store[index] = data;
        this.log();
        return true;
    }

    log(){
        console.log(this.store);
    }
}