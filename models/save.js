const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const SaveSchema=new Schema({
    ProductId:{
        type:mongoose.Types.ObjectId,
        ref:"products"
    }
    ,    
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
},{
    timestamps:true
});

const Save=mongoose.model('saveSchema',SaveSchema);
module.exports=Save;