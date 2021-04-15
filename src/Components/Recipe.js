import React, {useState , useEffect} from 'react'
import './Recipe.css'
import Card from './Card'
import Search from './SearchByRecipeName'
import SearchBar from './SearchByIngredients'
import {getRecipes} from '../api.js'
import ModeToggle from './ModeToggle'
import { useLocation } from 'react-router'

export default function Recipes () {
    const [recipes, setRecipes] = useState([]);
    const [mode,setMode] = useState('Recipe');
    const location = useLocation();
    console.log(location);
    const fetchRecipes=async()=>{
        try{
         const rec = await getRecipes(location.search);
         setRecipes(rec);
        }catch(error){
          console.log(error);
        }  
      }
      
      useEffect(() => {
        fetchRecipes();
      },[]);

        return (
            <>
            <ModeToggle setMode = {setMode}></ModeToggle>
            {mode === 'Recipe' ? <Search></Search> : <SearchBar></SearchBar>}             
            <div className="wrapper">
                    {
                    recipes.map(r =>
                    <Card 
                    key={r._id}
                    id = {r._id}
                    title = {r["Recipe Title"]}
                    instructions = {r["Instructions"]}
                    ingredients = {r["Ingredients"]}
                    img = {r["Images"]}          
                    description={r["Description"]}
                    ></Card>)}
             
                </div>
            </>
        )
}