import React, {useState , useEffect} from 'react'
import './Recipe.css'
import Card from './Card'
import {getRecipes} from '../api.js'
import { useLocation } from 'react-router'
import SearchManager from './Search'

export default function Recipes () {
    const [recipes, setRecipes] = useState([]);
    const [mode,setMode] = useState('Recipe');
    const location = useLocation();

    const fetchRecipes=async()=>{
        try{
         const rec = await getRecipes(location.search);
         setRecipes(rec);
        }catch(error){
          console.log(error);
        }  
      }

      useEffect(() => {
        if(location.state !== undefined)
          setMode(location.state.mode)
          fetchRecipes();
      },[location.search]);

        return (
            <>
            <SearchManager setCurrentMode = {setMode} currentMode={mode}></SearchManager>    
            <div className="wrapper">
                    {
                    recipes.map(r =>
                    <Card 
                    key={r._id}
                    id = {r._id}
                    title = {r.recipeTitle}
                    instructions = {r.instructions}
                    ingredients = {r.ingredients}
                    img = {r.image}          
                    servings={r.servings}
                    ></Card>)
                    }
             
                </div>
            </>
        )
}