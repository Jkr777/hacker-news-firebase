import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Input from '../../components/input';
import Button from '../../components/button';
import useFormValidation from '../../costumHook/useFormValidation';
import { firebase } from "../../firebase"; 

const INITIAL_STATE = {
  email: "",
  username: "",
  password: ""
};

const Login = props => {
  const { handleChange, handleSubmit, handleError, values, error } = useFormValidation(INITIAL_STATE, auth); 
  const [register, setRegister] = useState(false);

  async function auth() {
    const { email, username, password } = values;

    try {
      register 
        ? await firebase.register(username, email, password)
        : await firebase.login(email, password);
      props.history.push("/");
    }catch(err) {
      handleError(err.message);
    }
  }

  return (
    <section className="auth-container">
      <h1 className="auth-container__title">{register ? "Create account" : "Login"}</h1>
      {error && <p className="auth-container__error">{error}</p>}
      <form className="auth-container__form" onSubmit={handleSubmit}>
        <Input 
          iType={"email"}
          iName={"email"}
          iValue={values.email}
          iPlaceholder={"email"}
          iClass={"form__input"}
          change={handleChange}
          max={"255"}
          min={"5"}
          iFocus={true} 
          req={true}
          iAuto={"off"}
        />
        {register &&  <Input 
          iType={"text"}
          iName={"username"}
          iValue={values.username}
          iPlaceholder={"username"}
          iClass={"form__input"}
          change={handleChange}
          iFocus={false} 
          max={"255"}
          min={"2"}
          req={true}
          iAuto={"off"}
        />}
        <Input 
          iType={"password"}
          iName={"password"}
          iValue={values.password}
          iPlaceholder={"password"}
          iClass={"form__input"}
          change={handleChange}
          iFocus={false} 
          max={"255"}
          min={"6"}
          req={true}
          iAuto={"off"}
        />
        <div className="btns">
          <Button 
            bClass={"btns__auth-btn"}
            text={"submit"}
          />

          <button 
            type="button" 
            className="btns__auth-btn" 
            onClick={() => setRegister(prevRegister => !prevRegister)}>
              {register ? "already have an account ?" :"need to create an account ?"}
            </button>
        </div>
      </form>
      <div>
        <Link to="/reset" className="reset">forgot your password ?</Link>
      </div>
    </section>
  )
};

export default Login;