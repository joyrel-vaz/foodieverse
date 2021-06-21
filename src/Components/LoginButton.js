import React from 'react';
import { NavItem, NavLink} from 'reactstrap'
import './Navbar.css'

export default function LoginButton() {

 return (
    <NavItem className="nav-item-n right-nav l-n">
    <NavLink href="/Login">Login</NavLink>
  </NavItem> 
  );
}
