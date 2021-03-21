import React, {useState, useEffect } from 'react';
import { Button } from './Button';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import './NavBar.css'

export default function NavigationBar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
        <Router>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            FOODKART 
            <i class='fas fa-utensils' />
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link
               to='recipe'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Features
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/about'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                About
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/Contact'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Contact Us
              </Link>
            </li>

            <li>
              <Link
                to='login'
                className='nav-links-mobile'
                onClick={closeMobileMenu}
              >
                LOGIN
              </Link>
            </li>
          </ul>
          {button && <Button buttonStyle='btn--outline' className='login-button'>LOGIN</Button>}
          </Router>
        </div>
      </nav>
    </>
  );
}