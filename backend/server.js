const   express = require('express'),
        app = express(),
        cors = require('cors'),
        mongoose = require('mongoose'),
        dadiKeNuske = require('./models/dadiKeNuske.js'),
        recipe = require('./models/recipe.js'),
        favorite = require('./models/favorite.js'),
        shopList = require('./models/shopList.js'),
        mealPlan = require('./models/mealPlan'),
        meals = require('./models/meals'),
        user = require('./models/user'),
        PORT = 8080;


const dotenv = require('dotenv');
const result = dotenv.config();
if (result.error) {
    throw result.error;
}

app.use(express.json())
app.use(cors());

const imgApiKey=process.env.IMAGE_API_KEY;
const imgApiSecret=process.env.IMAGE_API_SECRET;
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
    let searchTerm = req.query.search_query;
    if(searchTerm === undefined || searchTerm === ''){
        recipe.find({},(err,recipesFound) =>{
            if(err) console.log(err);
            else {
            res.json(recipesFound);
            }
        }).limit(12)
    }

    else{ 
        let cookTime = req.query.cookTimes.split(',').map(ct => parseInt(ct)); //cooktimes array [0,30,90,120,121]
        let obj_arr = [];
        let servings = parseInt(req.query.servings);
        let obj = {}, i = 0;

        while(i < cookTime.length){
            if(i === cookTime.length-1)
                if(cookTime%2 !== 0)
                    { //last statement 
                    obj = {cookTime: {$gte:121}};
                    break;
                }
              
            obj = {$and: [{"cookTime": {$gte: cookTime[i]}},{"cookTime": {$lte: cookTime[i+1]}},]};
            i += 2 ;
            
            obj_arr.push(obj);
        }

        recipe.find( {$and: [
            {$or: obj_arr},
            {'maxServings':{$gte: servings}},
            {$text : {$search : searchTerm,$caseSensitive :false}}]} ,  
            { score : { $meta: "textScore" } } , 
            function(err,recipesFound)
            {
                if(err) console.log(err);
                else {
                res.json(recipesFound);
                }
            }).limit(12).sort({ score : { $meta : 'textScore' } });
}});

app.get('/api/recipes/:recipeID', (req,res)=>{
    recipe.findById(req.params.recipeID,(err,recFound) =>{
        if(err) console.log(err);
        else{
            console.log(recFound);
            return res.json(recFound);
        }
    })
})

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
                    //console.log(updateFav);
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
                { userID: req.params.userid },{Favorites:1,_id:0},{new:true} ,(err,allFavs) =>{
                    if(err) console.log(err);
                    //console.log(allFavs[0].Favorites)
                    else 
                    res.send(allFavs)
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

app.post('/api/users/:userid/mealPlanner/add',(req,res) =>{
        mealPlan.create(req.body , (err,newMeal) =>{
            if(err) console.log(err)
            else{
                        meals.findOneAndUpdate(
                            { userID: req.params.userid }, 
                            { $push: { Meals: newMeal._id } },{upsert:true},(err,addMeal) =>{
                                if(err) console.log(err);
                            }
                            );                    
                }
                let obj = newMeal.toJSON();
                obj.id = newMeal._id;
                delete obj._id;

                return res.json(obj);
            })

            
        })

app.get('/api/users/:userid/mealPlanner/show',(req,res) =>{
    meals.exists({ userID: req.params.userid }).then(exists =>{
        if(exists){
            meals.find({ userID: req.params.userid }).populate("Meals").exec(function (err, myMeals){
                    if (err) console.log(err);
                    else {
                        let obj_arr = [];
                        myMeals[0].Meals.forEach(meal => {
                            let obj = meal.toJSON();
                            obj.id = meal._id;
                            delete obj._id;
                            obj_arr.push(obj);
                        })
                        return res.json(obj_arr)
                    }
                })
        }
        else return [];
    })
})

app.get('/api/users/:userid/mealPlanner/:id/del' , (req,res) => {
    mealPlan.findByIdAndDelete(req.params.id,(err,del)=>{
        if(err) console.log(err);  
        else {
            if(del !== null){
                meals.findOneAndUpdate(
                    { userID: req.params.userid }, 
                    { $pull: { Meals: req.params.id } },(err,delMealID) =>{
                        if(err) console.log(err);
                    }
                );
            }
            return res.redirect(`/api/users/${req.params.userid}/mealPlanner/show`)
        }
    }
        
    );
})

app.post('/api/users/:userid/mealPlanner/:id/edit',(req,res)=>{
    mealPlan.findByIdAndUpdate(req.params.id, {$set: req.body},
        {new:true} ,
        (err,updatedMeal) =>{
        if(err) console.log(err)
        else {
            return res.redirect(`/api/users/${req.params.userid}/mealPlanner/show`)
        }
    })
})

app.post('/api/surprise-recipe',(req,res)=>{
    user.find({email:req.body.email},(req,res)=>{
        //gets allergen details
    })
    const allergenArr = req.body.allergens;
    allergenArr.forEach((part,index) =>{
       allergenArr[index] = '-' + allergenArr[index];
    })
    
    const allergens = allergenArr.join(' ') ;
    const searchTerm  = req.body.ing + " ";
    const filter = { $text: { $search: searchTerm + allergens , $caseSensitive :false} };
    recipe.aggregate([
      { $match: filter },
      { $sort: { score: { $meta: "textScore" } } },
      {$sample : {size:10}}
    ]).then((succ,err)=> {
        if(err) console.log(err)
      else return res.json(succ[0])
    });
});

// app.get('/api/imageSearch',(req,res) => {
//     var unirest = require("unirest");
//     req = unirest("GET", "https://api.imagga.com/v2/tags");
//     req.query({
//     "image_url": "https://images.financialexpress.com/2020/02/2-94.jpg",
//     "version": "2"
//     });
//     req.headers({
//     "accept": "application/json",
//     "authorization": "Basic YWNjXzhiMDk2MGYwODViNzNhODo1YTIwYmZkY2QyN2U0NDI4YzJiMDBlZTUwMTRjYmNmNg=="
//     });


//      req.end(function (respons) {
//     if (res.error) throw new Error(res.error);
//     console.log(res.body);
//     return res.body;
//     });

// });

app.get('/api/imageSearch',(req,res) => {
    console.log(req.query.url);
    const got = require('got');
    const apiKey = imgApiKey;
    const apiSecret = imgApiSecret;

    //const imageUrl = req.query.url;
    const imageUrl = "https://images.financialexpress.com/2020/02/2-94.jpg";
    const url = 'https://api.imagga.com/v2/tags?image_url=' + encodeURIComponent(imageUrl);
    (async () => {
        try {
            const response = await got(url, {username: apiKey, password: apiSecret});
            console.log('in response')
            console.log(response.body);
            res.json(response.body);
        } catch (error) {
            console.log(error.response.body);
        }
    })();

});



app.listen(PORT, ()=> console.log(`Listening on port ${PORT}`));