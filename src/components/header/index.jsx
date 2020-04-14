import React, {  } from 'react';
import { NavLink } from 'react-router-dom';
import { ReactComponent as Logo } from '../../icons/react.svg';


const Header = () => {
  return (
    <header className="header-container">
      <nav className="nav">
        <div className="nav__left">
          <Logo />
          <NavLink to='/' className="nav__link nav__link--title"> News News </NavLink>
          <NavLink to='/' className="nav__link"> new </NavLink>
          <span>|</span>
          <NavLink to='/' className="nav__link"> top </NavLink>
          <span>|</span>
          <NavLink to='/' className="nav__link"> search </NavLink>
          <span>|</span>
          <NavLink to='/' className="nav__link"> submit </NavLink>
        </div>
        <div className="nav__right">
          <NavLink to='/login'  className="nav__link--right"> login </NavLink>
        </div>
      </nav> 
    </header>
  )
};

export default Header;