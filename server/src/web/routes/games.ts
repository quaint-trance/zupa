import express from 'express';
import { domain } from '../../index'

const router = express.Router();

router.get('/', async (req, res)=>{
    try{

        const result = await domain.gameStoreService.getGames();
        res.status(200).send(result);
    }catch(err){
        console.error(err);
        res.status(500).send();
    }
});


export default router;