import Carousel from "react-multi-carousel";
import React, {useState , useEffect} from 'react'
import "react-multi-carousel/lib/styles.css";
import Card from './Card'
import {getRecipes} from '../api.js'
import { useLocation } from 'react-router'
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};
export default function RecipeCarousel() {
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
    return(
        <>
            <Carousel responsive={responsive}>
            {
                    recipes.map(r =>
                        <div className="card-margin">
                    <Card  
                    key={r._id}
                    id = {r._id}
                    title = {r.recipeTitle}
                    instructions = {r.instructions}
                    ingredients = {r.ingredients}
                    img = {r.image}          
                    servings={r.servings}
                    ></Card> </div>)
            }
            </Carousel>
        </>
    )

}