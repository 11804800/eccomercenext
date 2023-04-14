const express=require('express');
const tempRouter=express.Router();
const bodyparser=require('body-parser');
tempRouter.use(bodyparser.json());
const Temp =require('../models/temp');

tempRouter.route('/')
.get((req,res,next)=>
{
    Temp.find({})
    .then((resp)=>{
        res.status=200;
        res.setHeader('content-Type','application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.post((req,res,next)=>
{
    Temp.create(req.body)
    .then((resp)=>{
        res.status=200;
        res.setHeader('content-Type','application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.delete((req,res,next)=>
{
    Temp.remove({})
    .then((resp)=>{
        res.status=200;
        res.setHeader('content-Type','application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err));
});

tempRouter.route('/:id')
.get((req,res,next)=>
{
    Temp.findById(req.params.id)
    .then((resp)=>{
        res.status=200;
        res.setHeader('content-Type','application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.put((req,res,next)=>
{
    Temp.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
    .then((resp)=>{
        res.status=200;
        res.setHeader('content-Type','application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.delete((req,res,next)=>
{
    Temp.findByIdAndRemove(req.params.id)
    .then((resp)=>{
        res.status=200;
        res.setHeader('content-Type','application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err));
});

module.exports=tempRouter;