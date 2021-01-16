import express from 'express';
import { domain } from '../../'

const router = express.Router();

router.post('/create', async (req, res)=>{
    const result = await domain.connect4Service.createGame(req.body.playerName);
    if(!result) return res.status(400).send();
    res.status(200).send(result);
});

router.post('/join', async (req, res)=>{
    const result = await domain.connect4Service.joinPlayer(req.body.gameId, req.body.playerName);
    if(!result) return res.status(400).send();
    res.status(200).send(result);
});


export default router;