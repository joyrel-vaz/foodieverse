import React, {useState , useEffect} from 'react'
import './Recipe.css'
import Card from './Card'
import Search from './Search'
import {getRecipes} from '../api.js'

import { useLocation } from 'react-router'

export default function Recipes () {
    const [recipes, setRecipes] = useState([]);
    const location = useLocation()
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
            <Search></Search>
            <div className="wrapper">
                
                    {
                    recipes.map(r =>
                    <Card 
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