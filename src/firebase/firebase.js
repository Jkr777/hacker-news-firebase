import app from "firebase/app"; 
import "firebase/auth"; 
import firebaseConfig from "./config";

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig); 
    this.auth = app.auth(); 
  }
  
  async register(username, email, password) {
    const newUser = await this.auth.createUserWithEmailAndPassword(email, password); 

    return await newUser.user.updateProfile({
      displayName: username
    }); 
  } 

  async login(email, password) {
    return await this.auth.signInWithEmailAndPassword(email, password); 
  } 
} 

export const firebase = new Firebase(); 