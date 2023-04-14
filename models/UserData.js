const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const UserDataSchema=new Schema({
    Card:{
        cardno:{
            type:String,
        },
        cvv:{
            type:String
        },
        data:{
            type:String
        },
        type:{
            type:String,
            default:"Bajaj"
        }
    }
    ,address:{
        type:String
    },
    addressType:{
        type:String,
        default:"Home"
    },
    upi:{
        type:String
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
},{
    timeStamps:true
});

const UserData=mongoose.model('userdataSchema',UserDataSchema);
module.exports=UserData;