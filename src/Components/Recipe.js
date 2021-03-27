import React, { Component } from 'react'
import './Recipe.css'
import Card2 from './Card2'
import Search from './Search'

import {Container, Row, Col} from 'react-bootstrap'
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
            <>
            <br></br><br></br>
            <Search></Search>
            <Container fluid>
                <Row>
                    <Col><Card2></Card2></Col>
                    <Col><Card2></Card2></Col>
                    <Col><Card2></Card2></Col>
                    <Col><Card2></Card2></Col>
                </Row>
                <Row>
                <Col><Card2></Card2></Col>
                    <Col><Card2></Card2></Col>
                    <Col><Card2></Card2></Col>
                    <Col><Card2></Card2></Col>
                
                </Row>
                <Row>
                <Col><Card2></Card2></Col>
                    <Col><Card2></Card2></Col>
                    <Col><Card2></Card2></Col>
                    <Col><Card2></Card2></Col>
                
                </Row>
                <Row>
                <Col><Card2></Card2></Col>
                    <Col><Card2></Card2></Col>
                    <Col><Card2></Card2></Col>
                    <Col><Card2></Card2></Col>
                
                </Row>
                <Row>
                <Col><Card2></Card2></Col>
                    <Col><Card2></Card2></Col>
                    <Col><Card2></Card2></Col>
                    <Col><Card2></Card2></Col>
                
                </Row>
                </Container>
            </>
        )
    }
}