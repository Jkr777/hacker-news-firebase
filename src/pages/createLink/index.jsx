import React, { useContext } from "react";
import Input from "../../components/input";
import Button from "../../components/button";
import useFormValidation from "../../costumHook/useFormValidation";
import FirebaseContext from "../../context";

const INITIAL_STATE = {
  description: "",
  link: ""
};

const CreateLink = props => {
  const { firebase, user } = useContext(FirebaseContext); 
  const { values, handleChange, handleSubmit } = useFormValidation(INITIAL_STATE, handleCreate);

  function handleCreate() {
    if(!user) {
      props.history.push("/login");
    } else {
      const { description, link } = values; 
      const newLink = {
        link,
        description,
        postedBy: {
          id: user.uid,
          username: user.displayName
        },
        votes: [],
        comments: [],
        created: Date.now()
      }
      firebase.db.collection('links').add(newLink);
      props.history.push("/");
    } 
  }

  return (
    <div className="createLink-container">
      <form onSubmit={handleSubmit} className="createLink__form">
        <textarea 
          name="description"
          value={values.description}
          placeholder="a description for your link"
          className="form__textArea"
          onChange={handleChange}
          maxLength="500"
          autoFocus={true} 
          required={true}
        />  
        <Input 
          iType={"url"}
          iName={"link"}
          iValue={values.link}
          iPlaceholder={"add your link"}
          iClass={"form__input"}
          change={handleChange}
          max={"555"}
          min={"5"}
          iFocus={false} 
          req={true}
          iAuto={"off"}
        />  
        <Button 
          bClass={"btns__auth-btn"}
          text={"submit"}
        />
      </form>
    </div>
  )
};

export default CreateLink;