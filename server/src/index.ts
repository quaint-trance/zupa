import dotenv from 'dotenv'
import server from './server';
import domainFactory from './domainFactory'
import {resolve} from 'path'
import gamesStore from './infrastructure/gamesStore';
import EventEmitter from './infrastructure/EventEmitter';
import mongoUserStore from './infrastructure/mongoUserStore.ts'
import mongoSkinStore from './infrastructure/mongoSkinStore.ts'

dotenv.config({path: resolve(__dirname, "../.env")});

const { io } = server();

export const domain = domainFactory(
    new gamesStore(new EventEmitter(io)),
    new mongoUserStore(),
    new mongoSkinStore(),    
);

export type domainType = typeof domain;