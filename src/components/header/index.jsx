import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import FirebaseContext from "../../context";
import { ReactComponent as Logo } from '../../icons/react.svg';


const Header = () => {
  const { user, firebase } = useContext(FirebaseContext);

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
          {user ? (
            <>
              <span>{user.displayName}</span>
              <span className="nav__link">|</span>
              <NavLink to='/' className="nav__link--right" onClick={() => firebase.logout()} > logout </NavLink>
            </>
          ) : <NavLink to='/login' className="nav__link--right"> login </NavLink>}
        </div>
      </nav> 
    </header>
  )
};

export default Header;