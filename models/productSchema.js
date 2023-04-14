var mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    fullname:{
        type:String
    },
    Cprice:{
        type:Currency
    },
    price: {
        type: Currency,
        required: true
    },
    featured:{
        type:Boolean,
        default:false
    },
    label: {
        type: String
    },
    Seller: {
        type: String
    },
    weight:{
        type:Number
    },
    description: {
        type: String
    },
    Category:
    {
        type: String,
        required: true
    },
    Brand: {
        type: String,
        required: true
    },
    Model:{
        type:String
    },
    preveiw: {
        preveiw1: {
            type: String,
            required: true
        },
        preveiw2: {
            type: String,
            required: true
        },
        preveiw3: {
            type: String,
            required: true
        }
    },
    SellerType:
    {
        type: String
    },
    Prime:{
        type:Boolean,
        default:false
    },
    charge:{
        type:Number
    },
    ProtectionPlan:
    {
        name:{
                type:String
        },
        price:
        {
            type:Currency
        }
    },
    Quantity:{
        type:Number,
        default:0,
        required:true
    },
    size:{
        type:Number,
        required:true
    },
    color:
    {
        type:String,
        required:true
    },
    certified:{
        type:Boolean,
        default:false,
        required:true
    },
    fitType:{
        type:String
    }
    ,
    series:{
        type:String
    },
    Ram:{
        type:String
    },
    storage:
    {
        type:String
    },
    processor:
    {
        type:String
    },
    os:{
        type:String
    },
    camera:{
        type:String
    }

},
    {
        timestamps: true
    });

const Products = mongoose.model('products', productSchema);
module.exports = Products;