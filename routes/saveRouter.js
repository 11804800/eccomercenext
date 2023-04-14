const express=require('express');
const saveRouter=express.Router();
const Save=require('../models/save');
const bodyparser=require('body-parser');
saveRouter.use(bodyparser.json());
const authenticate=require('../authenticate');

saveRouter.route('/')
.get(async (req,res)=>{
    try
    {
        const cart=await Save.find({}).populate('author');
        res.status(200).json(cart);
        
    }
    catch (err)
    {
        res.status(400).send(err);
    }
})
.post(authenticate.verifyUser,(req,res,next)=>{
    if(req.body!=null)
    {
        req.body.author=req.user._id;
        Save.create(req.body)
        .then((comment)=>{
            Save.findById(comment._id)
            .populate('author')
            .then((comment)=>{
                res.statusCode=200;
                res.setHeader('Content-Type','application/json');
                res.json(comment);
            })
        },(err)=>next(err))
        .catch((err)=>next(err));
    }
})
.delete((req,res,next)=>{
    Save.remove({})
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('content-type','application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err));
});

saveRouter.route('/:id')
.get(async (req,res)=>
{
    try
    {
        const resp=await Save.findById(req.params.id);
        res.status(200).json(resp);
    }
    catch(err)
    {
        res.status(500).send(err);
    }
})
.put(authenticate.verifyUser,async (req,res)=>{
    try{
        const resp=await Save.findByIdAndUpdate(req.params.id,
            {
                $set:req.body
            },{new:true});
        res.status(200).json(resp);
    }
    catch(err)
    {
        res.status(500).send(err);
    }
})
.delete(authenticate.verifyUser,async (req,res)=>{
    try{
        const resp=await Save.findByIdAndRemove(req.params.id);
        const data=await Save.find({});
        res.status(200).json(data);
    }
    catch(err)
    {
        res.status(500).send(err);
    }
});

module.exports=saveRouter;