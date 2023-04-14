const express=require('express');
const bodyparser=require('body-parser');

const planRouter=express.Router();
planRouter.use(bodyparser.json());
const Plan =require('../models/plan');

planRouter.route('/')
.get(async (req,res)=>{
    try{
        const resp=await Plan.find({});
        res.status(200).json(resp);
    }
    catch(err)
    {
        res.status(400).send(err);
    }
})
.post( async (req,res)=>{
    try{
        const resp=await Plan.create(req.body);
        res.status(200).json(resp);
    }
    catch(err)
    {
        res.status(400).send(err);
    }
});

module.exports=planRouter;