const mongoose = require('mongoose');

//meal plan schema
var mealPlanSchema = new mongoose.Schema({
    title:String, 
    startDate: Date,
    endDate : Date,
    notes:String,
    recipeID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "recipe"
    }
});

module.exports = mongoose.model('mealPlan', mealPlanSchema);
