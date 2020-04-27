import React, { useState, useContext } from "react";
import Input from "../../components/input";
import FirebaseContext from "../../context";

const Reset = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [emailVerification, setEmailVerification] = useState(false);

  const { firebase } = useContext(FirebaseContext);

  const handleChange = e => setEmail(e.target.value);

  async function handleReset() {
    try {
      await firebase.resetPassword(email); 
      setEmailVerification(true);
      setError(null);
    } catch (err) {
      setEmailVerification(false);
      setError(err.message);
    }
  }
  return (
    <div className="reset-container">
      <div>
        {error && <p className="reset-container__error">{error}</p>}
        {emailVerification && <p>Check your email!</p>}
        <Input 
          iType={"email"}
          iName={"email"}
          iValue={email}
          iPlaceholder={"add your email"}
          iClass={"form__input"}
          change={handleChange}
          max={"255"}
          min={"5"}
          iFocus={true} 
          req={true}
          iAuto={"off"}
        />
      </div>
    <button className="btns__auth-btn" onClick={handleReset}>reset password</button>
    </div>
  );
};

export default Reset;