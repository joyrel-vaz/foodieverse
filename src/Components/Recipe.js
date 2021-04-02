import React, {useState , useEffect, Component } from 'react'
import './Recipe.css'
import Card2 from './Card2'
import Search from './Search'
import {getRecipes} from '../api.js'

import {Container, Row, Col} from 'react-bootstrap'

export default function Recipes () {
    const [recipes, setRecipes] = useState([]);
    const fetchRecipes=async()=>{
        try{
          const recipes = await getRecipes();
          setRecipes(recipes);
          console.log(recipes);
        }catch(error){
          console.log(error);
        }  
      }
      
      useEffect(() => {
        fetchRecipes();
      },[]);


        return (
            <>
            <br></br><br></br>
            <Search></Search>
            <Container fluid>
                <Row>
                    {
                    recipes.map(r =>
                    <Col><Card2 
                    id = {r.__id}
                    title = {r["Recipe Title"]}
                    instructions = {r["Instructions"]}
                    ingredients = {r["Ingredients"]}
                    image = {r["Images"]}          
                    ></Card2></Col>)}
                </Row>
                </Container>
            </>
        )
}