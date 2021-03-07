import dotenv from 'dotenv'
import server from './server';
import { resolve } from 'path'

import UserService from './application/userService';

import UserRepo from './infra/User/userMongoRepository'

dotenv.config({path: resolve(__dirname, "../.env")});

const { io } = server();
const userRepo = new UserRepo();

const infra = {
    userRepo: new UserRepo(),

}

export const application = {
    userService: new UserService(infra.userRepo),
};


(async ()=>{
    const user = await userRepo.findByName('Piotrek32')
    console.log({...user, history:[]});
})();
