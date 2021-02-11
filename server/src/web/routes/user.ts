import express from 'express';
import { domain } from '../..'

const router = express.Router();

router.post('/create', async (req, res)=>{
    try{

        const result = await domain.userService.createUser(req.body.name, req.body.email, req.body.password);
        if(!result) return res.status(400).send();
        res.status(200).send();
    }catch(err){
        console.error(err);
        res.status(500).send();
    }
});

router.post('/login', async (req, res)=>{
    try{

        console.log(req.body);
        const result = await domain.userService.getToken(req.body.password, req.body.email, req.body.name);
        console.log(result);
        if(!result) return res.status(400).send();
        res.status(200).send({token: result.getToken(), payload: result.getPayload()});
    }catch(err){
        console.error(err);
        res.status(500).send();
    }
});

router.get('/profile', async (req, res)=>{
    try{

        const name = req.query.name;
        if(!name || typeof name !== 'string') return;
        const result = await domain.userService.getUser(name);
        if(!result) return res.status(400).send();
        res.status(200).send(result);
    }catch(err){
        console.error(err);
        res.status(500).send();
    }
});


router.post('/save', async (req, res)=>{
    try{

        const result = await domain.userService.updateUser(req.body.token, {
            description: req.body.description,
            music: req.body.music,
        });
        if(!result) res.status(400).send();
        else res.status(200).send();
    }catch(err){
        console.error(err);
        res.status(500).send();
    }
});

router.get('/skin', async (req, res)=>{
    try{

        const id = req.query.id;
        if(typeof id !== 'string') return res.status(400).send({value: ''});
        const result = await domain.skinService.getOne(id);
        if(!result) return res.status(400).send({value: ''});
        res.status(200).send({value: result});

    }catch(err){
        console.error(err);
        res.status(500).send();
    }
});
    
router.post('/setSkin', async (req, res)=>{
    try{
        
        console.log(req.body);
        const result = await domain.skinService.setSkin(req.body.token, req.body.skinId);
        console.log(result);
        if(result === null) res.status(400).send();
        else res.status(200).send();    
    }catch(err){
        console.error(err);
        res.status(500).send();
    }
});

export default router;