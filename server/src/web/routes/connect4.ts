import express from 'express';
import { application } from '../../'

const router = express.Router();

router.post('/create', async (req, res)=>{
    try{
        let size;
        if(!req.body.size || !req.body.size.columns || !req.body.size.columns){
            size = undefined;
        } else{
            size = {
                columns: parseInt(req.body.size.columns),
                rows: parseInt(req.body.size.rows),
            }
        }
        
        let connectToWin;
        if(req.body.connectToWin) connectToWin = parseInt(req.body.connectToWin);
        const result = await application.connect4Service.createGame(
            req.body.playerName,
            size,
            connectToWin,
            req.body.userToken
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
        const result = await application.connect4Service.joinPlayer(req.body.gameId, req.body.playerName, req.body.userToken);
        if(!result) return res.status(400).send();
        res.status(200).send(result);
    }catch(err){
        console.error(err);
        res.status(500).send();
    }
});


export default router;