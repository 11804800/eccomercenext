const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlanSchema = new Schema({
    Category: {
        type: String
    }
    , price: {
        type: Number
    },
    name: {
        type: String
    }
},
    {
        timestamps: true
    });

const Plan = mongoose.model('plan', PlanSchema);
module.exports = Plan;