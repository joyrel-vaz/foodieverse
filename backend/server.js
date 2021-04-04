const express = require('express'),
app = express(),
cors = require('cors'),
mongoose = require('mongoose'),
dadiKeNuske = require('./models/dadiKeNuske.js'),
recipe = require('./models/recipe.js'),
shopList = require('./models/shopList.js'),
PORT = 8080;


const dotenv = require('dotenv');
const result = dotenv.config();
if (result.error) {
    throw result.error;
}

app.use(express.json())
app.use(cors());

const uri = process.env.MONGO_DB_URI;
var MongoClient = require('mongodb').MongoClient;
mongoose.connect(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
}).then(() => console.log("Database Connected Successfully"))
.catch(err => console.log(err));;

app.get('/api/home-remedies',(req,res) => {
    dadiKeNuske.find((err,dKNFound) =>{
        if(err) console.log(err);
        else {
        res.json(dKNFound);
        }
    });
});

app.get('/api/recipes',(req,res) => {
    let searchTerm = req.query.searchTerm;
    if(searchTerm === ""){
        recipe.find({},(err,recipesFound) =>{
            if(err) console.log(err);
            else {
            res.json(recipesFound);
            }
        }).limit(12)
    }

    else{ 
        recipe.find( {$text : {$search : searchTerm}} ,  
            { score : { $meta: "textScore" } } , 
            function(err,recipesFound)
            {
                if(err) console.log(err);
                else {
                res.json(recipesFound);
                }
            }).limit(12).sort({ score : { $meta : 'textScore' } });
}});


app.post('/api/createShop',(req,res) => {
    console.log("In createshop");
    MongoClient.connect(uri,{ useUnifiedTopology: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("recipe-app");
        var myobj = { userID: req.body.userID };
        dbo.collection("shoppingList").insertOne(myobj, function(err) {
          if (err) throw err;
          db.close();
          console.log("ShoppingList Document created");
          res.send();
        });
      }); 
});

app.get('/api/userShopList/:id',(req,res) => {
    shopList.findOne({ 'userID': req.params.id }, 'userID Items', function (err, list) {
        if (err) return console.err(err);
        res.json(list);
      });
});


app.listen(PORT, ()=> console.log(`Listening on port ${PORT}`));