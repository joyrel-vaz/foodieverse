import React from 'react'
import {Button, Nav, Navbar, NavDropdown, Form, FormControl}  from 'react-bootstrap'

export default function NavigationBar() {


    return (
        <div>
            <>
            <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">
      {/*<img
        alt="Logo"
        src="images/logo.png"
        className="d-inline-block align-top img-responsive"
      />{' '}*/}
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
                    href="#recipe">Recipes</NavDropdown.Item>
                    <NavDropdown.Item
                    href="#">Dadi Ke Nuske</NavDropdown.Item>
                    <NavDropdown.Item
                    href="#">Meal Planner</NavDropdown.Item>
                    <NavDropdown.Item
                    href="#">Shopping List</NavDropdown.Item>
                    <NavDropdown.Item
                    href="#">Favourites</NavDropdown.Item>
                    <NavDropdown.Item
                    href="#">Settings</NavDropdown.Item>
                    <NavDropdown.Item
                    href="#">Foodium</NavDropdown.Item>
                    <NavDropdown.Item
                    href="#">Help</NavDropdown.Item>
                    <NavDropdown.Item
                    href="#">Recipe of the day</NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link
                  href="#">About</Nav.Link>
                   <Nav.Link
                  href="#">Demo</Nav.Link>
                   <Nav.Link
                  href="#">Contact Us</Nav.Link>
                  <Nav.Link className="login-button"
                  href="/Login">Login</Nav.Link>
                  <Nav.Link
                  href="/recipes">Recipe Cards</Nav.Link>
                </Nav>
    
                <Form inline>
                  <FormControl type="text"
                  placeholder="Search" className="mr-sm-2"/>
                  <Button variant="outline-success">Search</Button>
                  </Form>
              </Navbar.Collapse>
            </Navbar>
  </>
</div>
    )
}
