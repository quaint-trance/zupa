import express from 'express';
import { domain } from '../../'

const router = express.Router();

router.post('/create', async (req, res)=>{
    try{
        const result = await domain.yatzyService.createGame(req.body.playerName);
        if(!result) return res.status(400).send();
        res.status(200).send(result);
    }catch(err){
        console.error(err);
        res.status(500).send
    }
});

router.post('/join', async (req, res)=>{
    try{
        const result = await domain.yatzyService.joinPlayer(req.body.gameId, req.body.playerName);
        if(!result) return res.status(400).send();
        res.status(200).send(result);
    }catch(err){
        console.error(err);
        res.status(500).send();
    }
});


export default router;