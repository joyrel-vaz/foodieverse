const mongoose = require('mongoose');

//meal plan schema
var mealPlanSchema = new mongoose.Schema({
    title:String, //temporary
    startDate: Date,
    endDate : Date,
    notes:String,
    allDay:Boolean,
    recipeID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "recipe"
    },
    rRule: String,
    exDate:String
});

module.exports = mongoose.model('mealPlan', mealPlanSchema);
