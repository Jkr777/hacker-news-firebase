import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { ReactComponent as Logo } from '../icons/react.svg';

const Auth = () => {
  const [register, setRegister] = useState(false);
  
  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
  <div>
    <header className="header-container">
      <nav className="nav">
        <div className="nav__left">
          <Logo />
          <NavLink to='/' exact className="nav__link nav__link--title"> News News </NavLink>
          <NavLink to='/' exact className="nav__link"> new </NavLink>
          <span>|</span>
          <NavLink to='/' exact className="nav__link"> top </NavLink>
          <span>|</span>
          <NavLink to='/' exact className="nav__link"> search </NavLink>
          <span>|</span>
          <NavLink to='/' exact className="nav__link"> submit </NavLink>
        </div>
        <div className="nav__right">
          <NavLink to='/' exact className="nav__link--right"> login </NavLink>
        </div>
      </nav> 
    </header>

    <section className="auth-container">
      <h1 className="auth-container__title">{register ? "Create account" : "Login"}</h1>
      <form className="auth-container__form" onSubmit={handleSubmit}>
        <input type="text" placeholder="email" className="form__input" autoFocus />
       {register && <input type="text" placeholder="username" className="form__input"/>}
        <input type="text" placeholder="password" className="form__input" />
        <div className="btns">
          <button className="btns__auth-btn">submit</button>
          <button className="btns__auth-btn" onClick={() => setRegister(!register)}>{register ? "already have an account ?" :"need to create an account ?"}</button>
        </div>
      </form>
    </section>
  </div>
);
}

export default Auth;