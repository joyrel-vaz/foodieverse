const mongoose = require('mongoose');

//favorite schema
var favoriteSchema = new mongoose.Schema({
	userID :{ type: String, unique:true, required:true},
    Favorites:[
        //array of object Ids belonging to recipes
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'recipe',
		}
    ]
});

module.exports = mongoose.model('favorite', favoriteSchema);
