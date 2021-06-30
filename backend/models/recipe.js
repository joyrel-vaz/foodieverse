const mongoose = require('mongoose');

//recipe schema
var recipeSchema = new mongoose.Schema({
	cookTime: Number,
	image: String,
	ingredients: String,
    recipeTitle : String,
    servings : String,
    instructions : [
      {type:  String}
    ],
    minServings:Number,
    maxServings:Number
});

module.exports = mongoose.model('recipe', recipeSchema);
