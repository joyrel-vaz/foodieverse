const express = require('express'),
app = express(),
cors = require('cors'),
mongoose = require('mongoose'),
dadiKeNuske = require('./models/dadiKeNuske.js'),
recipe = require('./models/recipe.js'),
favorite = require('./models/favorite.js'),
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
    useFindAndModify: false,
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
    if(searchTerm === undefined || searchTerm === ''){
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
    shopList.exists({'userID': req.body.userID},function (err, doc){
        if (err){
            console.log(err)
        }else{
            if(!doc){
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
            }else{
                console.log("ShoppingList Document Exists");
                res.send();
            }            
        }
    });
});

app.get('/api/userShopList/:id',(req,res) => {
    shopList.findOne({ 'userID': req.params.id }, 'userID Items', function (err, list) {
        if (err) return handleError(err);
        // console.log(list);
        res.json(list);
      });
});

app.get('/api/userShopList/add/:id/:item',(req,res) => {
    shopList.exists({'userID': req.params.id, Items:{"$in": [req.params.item]}},function (err, doc){
        if (err){
            console.log(err)
        }else{
            //console.log("Result :", doc);
            if(doc==false){
                shopList.findOneAndUpdate({'userID': req.params.id}, { $push:{Items:req.params.item} }, {new:true}, function (err, list) {
                if (err) return handleError(err);
                // console.log(list);
                res.json(list);
              });
            }else{
                res.json({Items: [],
                    _id: null,
                    userID: "Item Already Exists!"});
            }
        }
    });

    
});

app.get('/api/userShopList/del/:id/:item',(req,res) => {
    shopList.findOneAndUpdate({'userID': req.params.id}, { $pull:{Items:req.params.item} }, {new:true, multi:false}, function (err, list) {
        if (err) return handleError(err);
        // console.log(list);
        res.json(list);
      });
});

app.get('/api/users/:userid/favorites/add/:id' , (req,res) => {
    favorite.exists({ userID: req.params.userid }).then(exists =>{
        if(exists){
            favorite.findOneAndUpdate(
                { userID: req.params.userid }, 
                { $push: { Favorites: req.params.id } },(err,updateFav) =>{
                    if(err) console.log(err);
                    console.log(updateFav);
                }
                );
        }
        else
        {favorite.create({userID: req.params.userid, 
            $push: { Favorites: req.params.id }},(err,newFav) =>{
            if(err) console.log(err);
            })}
    })

})

app.get('/api/users/:userid/favorites/show' , (req,res) => {
    favorite.exists({ userID: req.params.userid }).then(exists =>{
        if(exists){
            favorite.find(
                { userID: req.params.userid } ,(err,allFavs) =>{
                    if(err) console.log(err);
                    else res.json(allFavs)
                }
                );
        }
        else return [];
    })

})

app.get('/api/users/:userid/favorites',(req,res) =>{
    favorite.find({ userID: req.params.userid }).populate("Favorites").exec(function (err, favs)
    {
        if (err) console.log(err);
        else 
        return res.json(favs);
    })    
})


app.get('/api/users/:userid/favorites/del/:id' , (req,res) => {
            favorite.findOneAndUpdate(
                { userID: req.params.userid }, 
                { $pull: { Favorites: req.params.id } },(err,delFav) =>{
                    if(err) console.log(err);
                }
            );
})

app.listen(PORT, ()=> console.log(`Listening on port ${PORT}`));