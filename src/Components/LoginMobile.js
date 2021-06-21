import React from 'react';
import { NavItem, NavLink} from 'reactstrap'
import './Navbar.css'

export default function LoginButton() {

 return (
    <NavItem className="nav-item-m">
            <NavLink href="/Login" className="navL">Login</NavLink>
          </NavItem>
  );
}
