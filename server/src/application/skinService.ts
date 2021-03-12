import { SkinStore as SkinRepo} from "../types/SkinStore";
import { UserStore as UserRepo} from "../types/UserStore";

import Skin from '../domain/Skin'
import User from '../domain/User'
import Token from '../domain/entities/Token'

export default class SkinSerivce{

    private skinRepo: SkinRepo;
    private userRepo: UserRepo;

    constructor(infra: {skinRepo: SkinRepo, userRepo: UserRepo}){
        this.skinRepo = infra.skinRepo;
        this.userRepo = infra.userRepo;
    }

    async getAll(){
        return await this.skinRepo.getAll();
    }
    
    async getOne(id: string){
        return await this.skinRepo.findById(id);
    }

    async create(value: string){
        return await Skin.create(value);
    }

    async unlock(userName: string, skinId: string){
        const user = await this.userRepo.findByName(userName);
        if(! await this.skinRepo.findById(skinId) || !user ) return null;
        if( user.hasSkin(skinId) ) return null;

        user.unlockSkin(skinId);
        this.userRepo.save(user);
    }


    async setSkin(userToken: string, skinId: string){
        const token = Token.hydrate(userToken);
        const userName = await token.getPayload().name;
        const user = await this.userRepo.findByName(userName);
        if(! await this.skinRepo.findById(skinId) || !user) return null;

        user.setSkin(skinId);
        this.userRepo.save(user);
    }

}