// import {auth, db} from "./config";
// import { 
//   createUserWithEmailAndPassword, 
//   signInWithEmailAndPassword, 
//   signOut 
// } from "firebase/auth";
// import { addDoc, collection } from "firebase/firestore/lite";
// import bcrypt from "bcryptjs"; 

// const hashPassword = async (password) => {
//   const saltRounds = 10;
//   return bcrypt.hash(password, saltRounds);
// };

// export const signUp = async (name, email, password) => {
//   try {
//     // Create user with Firebase Auth
//     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//     const user = userCredential.user;

//     // Hash password (optional)
//     const hashedPassword = await hashPassword(password);

//     // Store user info in Firestore
//     await addDoc(collection(db, "users"), {
//       uid: user.uid,
//       name,
//       email,
//       authProvider: "local",
//       password: hashedPassword, // Optional: Firebase Auth already secures passwords
//       createdAt: new Date().toISOString()
//     });
//     return user; // return user object for further use
//   } catch (error) {
//     alert(error.message)
//     console.error("Signup Error:", error.message);
//     throw error; // propagate error to caller
//   }
// };

// export const login = async (email, password) => {
//   try {
//     const userCredential = await signInWithEmailAndPassword(auth, email, password);
//     console.log("userCredential = ", userCredential)
//     return userCredential.user;
//   } catch (error) {
//     console.error("Login Error:", error.message);
//     throw error;
//   }
// };

// export const logout = async () => {
//   try {
//     await signOut(auth);
//   } catch (error) {
//     console.error("Logout Error:", error.message);
//     throw error;
//   }
// };

// src/firebase/auth.js
import { auth, db } from "./config";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut 
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore/lite";


const handleResponse = (success, data = null, error = null) => ({
  success,
  data,
  error,
});

// Sign up
export const signUp = async (name, email, password) => {
  try {
    // Create user with Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Store additional user info in Firestore
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      email,
      authProvider: "local",
      createdAt: new Date().toISOString()
    });

    return handleResponse(true, user);

  } catch (error) {
    console.error("Signup Error:", error.message);
    return handleResponse(false, null, error.message);
  }
};

// Login
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return handleResponse(true, userCredential.user);
  } catch (error) {
    console.error("Login Error:", error.message);
    return handleResponse(false, null, error.message);
  }
};

// Logout
export const logout = async () => {
  try {
    await signOut(auth);
    return handleResponse(true, "Logged out successfully");
  } catch (error) {
    console.error("Logout Error:", error.message);
    return handleResponse(false, null, error.message);
  }
};
