import dotenv from 'dotenv'
import server from './server';
import { resolve } from 'path'

import UserService from './application/userService';

import UserRepo from './infra/User/userMongoRepository'
import SkinRepo from './infra/Skin/SkinMongoStore'
import SkinSerivce from './application/skinService';

dotenv.config({path: resolve(__dirname, "../.env")});

const { io } = server();
const userRepo = new UserRepo();

const infra = {
    userRepo: new UserRepo(),
    skinRepo: new SkinRepo(),
}

export const application = {
    userService: new UserService(infra.userRepo),
    skinService: new SkinSerivce(infra.skinRepo, infra.userRepo),
};


(async ()=>{
    const user = await userRepo.findByName('Piotrek32')
    console.log({...user, history:[]});
})();
