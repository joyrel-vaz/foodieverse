import React, {useState , useEffect, Component } from 'react'
import './Recipe.css'
import Card2 from './Card2'
import Search from './Search'
import {getRecipes} from '../api.js'

import {Container, Row, Col} from 'react-bootstrap'
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
            <br></br><br></br>
            <Search></Search>
            <Container fluid>
                <Row>
                    {
                    recipes.map(r =>
                    <Col><Card2 
                    id = {r._id}
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