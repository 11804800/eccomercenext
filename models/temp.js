const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const TempSchema=new Schema({
    ProductId:{
        type:mongoose.Types.ObjectId,
        ref:"products",
        unique:true
    },
    Quantity:{
        type:Number,
        default:1
    }
},{
    timestamps:true
});

const Temp=mongoose.model('tempSchema',TempSchema);
module.exports=Temp;
