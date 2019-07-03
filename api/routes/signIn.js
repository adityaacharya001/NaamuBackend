import express from 'express';
import Credential from '../models/credential';

const router = express.Router();

router.get('/', (req, res, next)=>{
    res.status(200).json({
        message:"handling get request at /signIn"
    })
})

router.post('/', (req, res, next)=>{
    Credential.find({username: req.body.username, password: req.body.password})
    .then(result=>{
        console.log("Login Successful", result);
        res.status(200).json({
            message: "Login Successful",
            token: {
                user: result[0].username,
                department: result[0].department
            }
        })
    }).catch(error=>{
        console.log("Login Unsuccessful", error);
        res.status(500).json({
            message: "Login Unsuccessful"
        })
    })
})

export default router;