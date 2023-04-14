const express=require('express');
const orderRouter=express.Router();
const Order=require('../models/order');
const bodyparser=require('body-parser');
orderRouter.use(bodyparser.json());
const authenticate=require('../authenticate');

orderRouter.route('/')
.get(async (req,res)=>{
    try
    {
        const resp=await Order.find({})
        .populate('buyer');
        res.status(200).json(resp);
        
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
        Order.create(req.body)
        .then((comment)=>{
            Order.findById(comment._id)
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
.delete(authenticate.verifyUser,(req,res,next)=>{
    Order.remove({})
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('content-type','application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err));
});

orderRouter.route('/:id')
.get(async (req,res)=>
{
    try
    {
        const resp=await Order.findById(req.params.id)
        .populate('buyer');
        res.status(200).json(resp);
    }
    catch(err)
    {
        res.status(500).send(err);
    }
})
.put(authenticate.verifyUser,async (req,res)=>{
    try{
        const resp=await Order.findByIdAndUpdate(req.params.id,
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
        const resp=await Order.findByIdAndRemove(req.params.id);
        const data=await Order.find({});
        res.status(200).json(data);
    }
    catch(err)
    {
        res.status(500).send(err);
    }
});

module.exports=orderRouter;