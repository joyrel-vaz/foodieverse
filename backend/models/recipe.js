const mongoose = require('mongoose');

//recipe schema
var recipeSchema = new mongoose.Schema({
	cookTime: Number,
	image: String,
	ingredients: String,
    recipeTitle : String,
    servings : String,
    instructions : String
});

module.exports = mongoose.model('recipe', recipeSchema);
