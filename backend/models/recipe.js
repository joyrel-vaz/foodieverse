const mongoose = require('mongoose');

//recipe schema
var recipeSchema = new mongoose.Schema({
	"Cook Time": Number,
	Images: String,
	Ingredients: String,
    "Recipe Title" : String,
    Servings : String,
    Instructions : String
});

module.exports = mongoose.model('recipe', recipeSchema);
