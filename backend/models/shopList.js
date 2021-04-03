const mongoose = require('mongoose');

//shoppingList schema
var shopListSchema = new mongoose.Schema({
	UserId: String,
	Items: [String] 
});
module.exports = mongoose.model('shoppingList',shopListSchema, "shoppingList");
