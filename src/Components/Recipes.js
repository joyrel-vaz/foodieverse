import React, {useState , useEffect} from 'react'
import './Recipe.css'
import Card from './Card'
import {getRecipes} from '../api.js'
import { useLocation } from 'react-router'
import SearchManager from './Search'
import RecipeFilter from './RecipeFilter'
import {Col,Row,Container} from 'react-bootstrap'

export default function Recipes () {
    const [recipes, setRecipes] = useState([]);
    const [mode,setMode] = useState('Recipe');
    const location = useLocation();
    const [ranges, setRanges] = React.useState({
      range1: false, //0 to 30
      range2: false, //31 to 60
      range3: false, // 61 to 90
      range4: false, //91 to 120
      range5: false, //121 to 150
      range6: false, //150+
    });
    let arr = [];

    const allUnchecked = () =>{
      const { range1,range2,range3,range4,range5,range6 } = ranges;
      if(!range1 && !range2 && !range3 && !range4 && !range5 && !range6)
        return true;
      return false;
    }

    const addRangeValues = () =>{
      const { range1,range2,range3,range4,range5,range6 } = ranges;
      if(range1)
        arr.push(0,30);
      if(range2)
        arr.push(31,60);
      if(range3)
        arr.push(61,90);
      if(range4)
        arr.push(91,120);
        if(range5)
        arr.push(121,150);
      if(range6)
        arr.push(150);
      if(allUnchecked())
        arr.push(0,30,31,61,90,91,120,121,150)
    }

    const fetchRecipes=async()=>{
        try{
          addRangeValues();
         const rec = await getRecipes(location.search,arr);
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
            <Container>  
            <Row className="justify-content-md-center">
              <Col>
              <SearchManager setCurrentMode = {setMode} currentMode={mode}></SearchManager> 
              </Col>
              </Row>
            <Row>
              <Col xs={6} md={3} className="border-right mh-100 border-dark"><RecipeFilter
              setRanges={setRanges}
              ranges={ranges}
            /> 
            </Col>
            <Col xs={6} md={9}>
            <div className="wrapper">
                    {
                    recipes.map(r =>
                    <Card 
                    key={r._id}
                    id = {r._id}
                    title = {r.recipeTitle}
                    instructions = {r.instructions}
                    ingredients = {r.ingredients}
                    cookTime={r.cookTime}
                    img = {r.image}          
                    servings={r.servings}
                    ></Card>)
                    }
             
                </div>
            </Col>
            </Row>
            </Container>
        )
}