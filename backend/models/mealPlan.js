const mongoose = require('mongoose');

//meal plan schema
var mealPlanSchema = new mongoose.Schema({
    startDate: String,
    endDate : String,
    startTime:String,
    endTime: String,
    notes:String,
    allDay:Boolean,
    repeat:{
        frequency:String,
        numOfDays:Number,
        endRepeat:{
            numOfOccs:Number,
            never: Boolean,
            after:{
                a_date: String,
                a_time: String
            }
        }
    }
});

module.exports = mongoose.model('mealPlan', mealPlanSchema);
