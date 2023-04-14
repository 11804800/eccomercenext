const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const commentSchema=new Schema({
    rating:{
        type:Number,
        default:1,
        max:5,
        min:1
    },
    comment:{
        type:String,
        required:true
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'products'
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
},{
    timestamps:true
});

const Comment=mongoose.model('commentSchema',commentSchema);
module.exports=Comment;