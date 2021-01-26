import express from 'express';
import { domain } from '../..'

const router = express.Router();

router.post('/create', async (req, res)=>{

    const timeouts = req.body.timeouts;

    const result = await domain.charadesService.createGame(
        req.body.playerName,
        timeouts,
    );
    
    if(!result) return res.status(400).send();
    res.status(200).send(result);
});

router.post('/join', async (req, res)=>{
    const result = await domain.charadesService.joinPlayer(req.body.gameId, req.body.playerName);
    console.log(result);
    if(!result) return res.status(400).send();
    res.status(200).send(result);
});


export default router;