import express from 'express';
import Credential from '../models/credential';
import mongoose from 'mongoose';

const router = express.Router();

router.get('/', (req, res, next)=>{
    res.status(200).json({
        message: "handling get request at /signUp"
    })
})

router.post('/', (req, res, next)=>{

    const credential = new Credential({
        _id: new mongoose.Types.ObjectId(),
        username: req.body.username,
        password: req.body.password,
        department: req.body.department
    })

    credential.save()
    .then(result=>{
        console.log(result);
        res.status(200).json({
            message: "crenditial posted successfully",
            credential: credential
        })
    }).catch(error=>{
        console.log(error);
        res.status(500).json({
            message: "credential could not be posted",
            error: error
        })
    });
})

export default router;
