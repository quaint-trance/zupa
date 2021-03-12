import express from 'express';
import { application } from '../../index'

const router = express.Router();

router.post('/create', async (req, res)=>{
    try{

        const timeouts = req.body.timeouts;
        const result = await application.charadesService.createGame(
            req.body.playerName,
            timeouts,
        );
            
        if(!result) return res.status(400).send();
        res.status(200).send(result);
    
    }catch(err){
        console.error(err);
        res.status(500).send();
    }
});

router.post('/join', async (req, res)=>{
    try{
        const result = await application.charadesService.joinPlayer(req.body.gameId, req.body.playerName);
        if(!result) return res.status(400).send();
        res.status(200).send(result);
    }catch(err){
        console.error(err);
        res.status(500).send();
    }
});


export default router;