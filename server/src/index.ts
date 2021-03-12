import dotenv from 'dotenv'
import server from './server';
import { resolve } from 'path'
import Token from './domain/entities/Token'

import UserService from './application/userService';
import SkinSerivce from './application/skinService';
import Connect4Service from './application/connect4Serivce';
import GameStoreService from './application/gameStore';

import UserRepo from './infra/User/userMongoRepository'
import SkinRepo from './infra/Skin/SkinMongoStore'
import Connect4Repo from './infra/Connect4/Connect4RamRepo'
import EventEmitter from './infra/EventEmitter/socketio'
import GameStore from './infra/GameStore';
import YatzyRepo from './infra/Yatzy/YatzyRamRepo';
import YatzyService from './application/yatzyService';

dotenv.config({path: resolve(__dirname, "../.env")});

const { io } = server();

const infra = {
    userRepo: new UserRepo(),
    skinRepo: new SkinRepo(),
    connect4Repo: new Connect4Repo(),
    yatzyRepo: new YatzyRepo(),
    eventEmitter: new EventEmitter(io),
}

export const application = {
    userService: new UserService(infra),
    skinService: new SkinSerivce(infra),
    connect4Service: new Connect4Service(infra),
    yatzyService: new YatzyService(infra),
    gameStoreService: new GameStoreService( {gameStore: new GameStore(infra)}),
    entities:{ Token }
};