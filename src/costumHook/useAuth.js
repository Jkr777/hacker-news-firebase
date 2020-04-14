import { useState, useEffect } from "react";
import { firebase } from "../firebase";

function useAuth() {
  const [authUser, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth.onAuthStateChanged(user => {
      if(user) {
        setUser(user);
      } else {
        setUser(null);
      }
    }) 
    return () => unsubscribe(); 
  }, [])

  return authUser; 
}

export default useAuth;