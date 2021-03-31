const express = require('express'),
app = express(),
cors = require('cors'),
mongoose = require('mongoose'),
dadiKeNuske = require('./models/dadiKeNuske.js'),
recipe = require('./models/recipe.js'),
PORT = 8080;

const dotenv = require('dotenv');
const result = dotenv.config();
if (result.error) {
    throw result.error;
}

app.use(express.json())
app.use(cors());

const uri = process.env.MONGO_DB_URI;
mongoose.connect(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
}).then(() => console.log("Database Connected Successfully"))
.catch(err => console.log(err));;

app.get('/api/home-remedies',(req,res) => {
dadiKeNuske.find(function(err,dKNFound)
{
    if(err) console.log(err);
    else {
    res.json(dKNFound);
    }
});
});

app.get('/api/recipes',(req,res) => {
    recipe.find( {"Cook Time" : 10} , function(err,recipesFound)
    {
        if(err) console.log(err);
        else {
        res.json(recipesFound);
        }
    });
    });


app.listen(PORT, ()=> console.log(`Listening on port ${PORT}`));