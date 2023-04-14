const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const orderSchema=new Schema({
    ProductId:{
        type:mongoose.Types.ObjectId,
        ref:"products"
    },
    Quantity:{
        type:Number,
        default:1
    },
    deliverydate:{
        type:String
    },
    orderdate:{
        type:String
    },
    deliveryStatus:{
        type:String,
        default:"Preparing"
    }
    ,paymentMethod:{
        type:String
    },
    address:{
        type:String
    },
    buyer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
},{
    timestamps:true
});

const Order=mongoose.model('orderSchema',orderSchema);
module.exports=Order;