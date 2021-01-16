import { PrismaClient } from '@prisma/client'
import cors from 'cors'
import express from 'express'
import { Server } from 'socket.io'
import socketHandler from './web/sockets'

import gameRoute from './web/routes/games'
import yatzyRoute from './web/routes/yatzy'
import connect4Route from './web/routes/connect4'

export default()=>{
    const app = express();
    const server = app.listen(process.env.PORT || 4000, ()=>{
        console.log('server up');
    });

    const io = new Server(server, {
        cors:{ credentials: false }
    });


    const prisma = new PrismaClient()
    //prisma.yatzy.deleteMany({}).then(res=> console.log('deleted'));


    io.on('connection', socketHandler);
    app.use(express.json());
    app.use(cors());

    app.use('/games', gameRoute);
    app.use('/yatzy', yatzyRoute);
    app.use('/connect4', connect4Route);


    return { io }

}