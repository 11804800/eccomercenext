const express=require('express');
const cartRouter=express.Router();
const Cart=require('../models/cart');
const bodyparser=require('body-parser');
cartRouter.use(bodyparser.json());
const authenticate=require('../authenticate');

cartRouter.route('/')
.get(async (req,res)=>{
    try
    {
        const cart=await Cart.find({})
        .populate('buyer');
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
        req.body.buyer=req.user._id;
        Cart.create(req.body)
        .then((comment)=>{
            Cart.findById(comment._id)
            .populate('buyer')
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
    Cart.remove({})
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('content-type','application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err));
});

cartRouter.route('/:id')
.get(async (req,res)=>
{
    try
    {
        const resp=await Cart.findById(req.params.id);
        res.status(200).json(resp);
    }
    catch(err)
    {
        res.status(500).send(err);
    }
})
.put(authenticate.verifyUser,async (req,res)=>{
    try{
        const resp=await Cart.findByIdAndUpdate(req.params.id,
            {
                $set:req.body
            },{new:true});
        const res=await Cart.find({});
        res.status(200).json(res);
    }
    catch(err)
    {
        res.status(500).send(err);
    }
})
.delete(authenticate.verifyUser,async (req,res)=>{
    try{
        const resp=await Cart.findByIdAndRemove(req.params.id);
        const data=await Cart.find({});
        res.status(200).json(data);
    }
    catch(err)
    {
        res.status(500).send(err);
    }
});

module.exports=cartRouter;