import React from 'react'
import {Nav, Navbar, NavDropdown}  from 'react-bootstrap'
import './NavBar.css'

export default function NavigationBar() {


    return (
        <div>
            <>
            <Navbar bg="light" expand="lg" fixed="top">
            <Navbar.Brand href="/">
      FOODKART
    </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav"/>
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link
                  href="/">Home</Nav.Link>
                  <NavDropdown title="Features"
                  id="basic-nav-dropdown">
                    <NavDropdown.Item
                    href="/recipes">Recipes</NavDropdown.Item>
                    <NavDropdown.Item
                    href="/home-remedies">Dadi Ke Nuske</NavDropdown.Item>
                    <NavDropdown.Item
                    href="/mealPlanner">Meal Planner</NavDropdown.Item>
                    <NavDropdown.Item
                    href="/shopping-list">Shopping List</NavDropdown.Item>
                    <NavDropdown.Item
                    href="/settings">Settings</NavDropdown.Item>
                    <NavDropdown.Item
                    href="/foodium">Foodium</NavDropdown.Item>
                    <NavDropdown.Item
                    href="/help">Help</NavDropdown.Item>
                    <NavDropdown.Item
                    href="/surprise">Surprise</NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link
                  href="/about">About</Nav.Link>
                   <Nav.Link
                  href="/contact">Contact Us</Nav.Link>
                  <Nav.Link className="login-button"
                  href="/Login">Login</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
  </>
</div>
    )
}