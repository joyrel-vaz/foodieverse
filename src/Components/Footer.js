import React from 'react'
import {Navbar}  from 'react-bootstrap'
import './footer.css'

export default function Footer() {
    return(
        
        <div className="main-footer">
        <div className="container">
        <div className="row">
        <div className="col-md-4 col-sm-8">
        <br></br><br></br><br></br>
        <Navbar.Brand className="nav-footer" href="/">
            FOODKART
        </Navbar.Brand>
        </div>
        <div className="col-md-4 col-sm-8">
        <br></br>
            <h6>Food For Foodies</h6>
            Crave and you have it! Who needs a recipe book when you have FoodKart!
            <ul >
                <li>Recipe By Ingredient</li>
                <li>Recipe Search</li>
                <li>Daadi Ke Nuskhe</li>
            </ul>            
        </div>
        <div className="col-md-4 col-sm-8">
        <br></br>
            <h6>Wanna Get in Touch?</h6>
            <ul className="list-unstyled">
                <li>Email</li>
                <li>Facebook</li>
                <li>Twitter</li>
            </ul>
        </div>
        </div>
        <div className="footer-bottom">
        <div className="p.text-xs-center">
        <center>&copy;{
            new Date().getFullYear()
        } FoodKart - All Rights Reserved</center>
        <br></br>
        </div>
        </div>
        </div>
        </div>
    )
}