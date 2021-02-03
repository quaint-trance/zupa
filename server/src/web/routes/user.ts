import express from 'express';
import { domain } from '../..'

const router = express.Router();

router.post('/create', async (req, res)=>{
    const result = await domain.userService.createUser(req.body.name, req.body.email, req.body.password);
    if(!result) return res.status(400).send();
    res.status(200).send();
});

router.post('/login', async (req, res)=>{
    console.log(req.body);
    const result = await domain.userService.getToken(req.body.password, req.body.email, req.body.name);
    console.log(result);
    if(!result) return res.status(400).send();
    res.status(200).send({token: result.getToken(), payload: result.getPayload()});
});

router.get('/profile', async (req, res)=>{
    const name = req.query.name;
    if(!name || typeof name !== 'string') return;
    const result = await domain.userService.getUser(name);
    if(!result) return res.status(400).send();
    res.status(200).send(result);
});


export default router;