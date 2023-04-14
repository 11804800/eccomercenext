const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const CartSchema=new Schema({
    ProductId:{
        type:mongoose.Types.ObjectId,
        ref:"products"
    },
    Quantity:{
        type:Number,
        default:1
    },
    include:
    {
        type:Boolean,
        default:true
    },
    buyer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
    
},{
    timestamps:true
});

const Cart=mongoose.model('cartSchema',CartSchema);
module.exports=Cart;