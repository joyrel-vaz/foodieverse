import React, { Component } from 'react'
import './Recipe.css';
import Card2 from './Card2';
export default class Recipes extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            displayCategories : true,
            displayRecipies: false,
            recipes: ""
        }
    }

    render() {
        return (
            <div className="container">
                <div>
            <div className="row">
                <div className="col-sm-2"></div>
                <div className="col-sm-8">
                </div>
                <div className="col-sm-2"></div>
            </div>
            <div className="row">
            <Card2/>
            
            </div> 
            </div> 
        </div>
        )
    }
}