import Token from "../domain/entities/Token";
import { UserType } from "../domain/User/UserLogic";
import { SkinStore } from "../types/SkinStore";
import { UserStore } from "../types/UserStore";
import { SkinType } from "../domain/entities/Skin";

export default class skinService{
    skinStore: SkinStore;
    Skin: SkinType;
    userStore: UserStore;
    User: UserType;

    constructor(skinStore: SkinStore, Skin: SkinType, userStore: UserStore, User: UserType){
        this.skinStore = skinStore;
        this.Skin = Skin;
        this.userStore = userStore;
        this.User = User;
    }

    async getAll(){
        const result = await this.skinStore.getAll();
        return result;
    }
    
    async getOne(id: string){
        const result = await this.skinStore.findById(id);
        if(!result) return null;
        return result.value;
    }

    async create(value: string){
        return await this.Skin.create(value);
    }

    async unlock(userName: string, skinId: string){
        const userData = await this.userStore.findByName(userName);
        if(! await this.skinStore.findById(skinId) || !userData ) return null;
        const user = this.User.hydrate(userData);

        const alreadyUnlocked = user.gameSettings.connect4?.unlocked.indexOf(skinId);
        if(alreadyUnlocked) return null;

        user.gameSettings.connect4?.unlocked.push(skinId);
        this.userStore.save(user.getData());
    }


    async setSkin(userToken: string, skinId: string){
        const token = Token.hydrate(userToken);
        const userName = await token.getPayload().name;
        const userData = await this.userStore.findByName(userName);
        if(! await this.skinStore.findById(skinId) || !userData ) return null;
        const user = this.User.hydrate(userData);

        user.setSkin(skinId);
        this.userStore.save(user.getData());
    }

}