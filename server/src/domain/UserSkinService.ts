import { SkinStore } from "../types/SkinStore";
import { UserStore } from "../types/UserStore";
import User from "./User";

export default class UserSkinService{
    
    constructor(
        private skinRepo: SkinStore,
    ){  }


    public async getSkinValue(user: User){
        const skinId = user.getAll().gameSettings.connect4.skin;
        if(!user.hasSkin(skinId)) return null;
        const skin = await this.skinRepo.findById(skinId);      
        return skin ? skin.getValue() : null;
    }

}