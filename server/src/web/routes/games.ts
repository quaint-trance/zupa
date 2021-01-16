import express from 'express';
import { domain } from '../../index'

const router = express.Router();

router.get('/', async (req, res)=>{
    const result = await domain.gameStoreService.getGames();
    res.status(200).send(result);
});


export default router;