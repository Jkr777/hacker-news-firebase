import React from 'react';

const Input = ({ iType, iName, iValue, iPlaceholder, iClass, iFocus, max, min, req, iAuto, change }) => (
  <input 
    type={iType} 
    name={iName}
    value={iValue}
    placeholder={iPlaceholder} 
    className={iClass} 
    autoFocus={iFocus} 
    minLength={min} 
    maxLength={max} 
    required={req} 
    autoComplete={iAuto}
    onChange={change} 
  />
);

export default Input;