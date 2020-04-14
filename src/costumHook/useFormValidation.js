import { useState, useEffect } from 'react';

function useFormValidation(initialState, auth) {
  const [values, setValues] = useState(initialState);
  const [submit, setSubmit] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if(submit) {
      auth(); 
    }
  }, [submit]);

  function handleError(err) {
    setError(err);
  }

  function handleChange(e) {
    e.persist();
    setValues(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmit(true);
  }

  return { handleChange, handleSubmit, handleError, values, error }
}

export default useFormValidation;