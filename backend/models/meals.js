const mongoose = require('mongoose');

//meals schema
var meals = new mongoose.Schema({
	userID :{ type: String, unique:true, required:true},
    Meals:[
        //array of object Ids belonging to meal plans
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'mealPlan',
		}
    ]
});

module.exports = mongoose.model('meals', meals);