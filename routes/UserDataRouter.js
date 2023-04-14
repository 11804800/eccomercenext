const express=require('express');
const UserDataRouter=express.Router();
const bodyparser=require('body-parser');
UserDataRouter.use(bodyparser.json());
const UserData=require('../models/UserData');


UserDataRouter.route('/')
.get((req,res,next)=>
{
    UserData.find({})
    .then((resp)=>{
        res.status=200;
        res.setHeader('content-Type','application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.post((req,res,next)=>
{
    UserData.create(req.body)
    .then((resp)=>{
        res.status=200;
        res.setHeader('content-Type','application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.delete((req,res,next)=>
{
    UserData.remove({})
    .then((resp)=>{
        res.status=200;
        res.setHeader('content-Type','application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err));
});

UserDataRouter.route('/:id')
.get((req,res,next)=>
{
    UserData.findById(req.params.id)
    .then((resp)=>{
        res.status=200;
        res.setHeader('content-Type','application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.put((req,res,next)=>
{
    UserData.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
    .then((resp)=>{
        res.status=200;
        res.setHeader('content-Type','application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.delete((req,res,next)=>
{
    UserData.findByIdAndRemove(req.params.id)
    .then((resp)=>{
        res.status=200;
        res.setHeader('content-Type','application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err));
});

module.exports=UserDataRouter;

