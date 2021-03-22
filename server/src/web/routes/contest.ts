import express from 'express';
import { application } from '../../index'

const router = express.Router();

router.get('/data', async (req, res)=>{
    try{
        const id = req.query.id;
        if(!id || typeof id !== 'string') return;
        const result = await application.contestService.getContest(id);
        if(!result) return res.status(400).send();
        res.status(200).send(result);
    }catch(err){
        console.error(err);
        res.status(500).send();
    }
});

export default router;