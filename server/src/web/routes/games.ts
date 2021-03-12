import express from 'express';
import { application } from '../../index'

const router = express.Router();

router.get('/', async (req, res)=>{
    try{
        const result = await application.gameStoreService.getAll();
        res.status(200).send(result);
    }catch(err){
        console.error(err);
        res.status(500).send();
    }
});


export default router;