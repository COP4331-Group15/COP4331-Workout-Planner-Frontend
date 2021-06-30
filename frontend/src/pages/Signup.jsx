import React, { useState } from "react";
import firebase from "../fire";

const Signup = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(email, password).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            switch(errorCode) {
                case 'auth/email-already-in-use':
                    alert("That email is already in use.");
                    break;
                case 'auth/invalid-email':
                    alert("That email address is invalid");
                    break;
                case 'auth/weak-password':
                    alert("That password is too weak.");
                    break;
                default:
                    console.log(errorMessage);
            }
            console.log(error);
        });
    }

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={({ target }) => setEmail(target.value)} placeholder="Email" />
                <br />
                <input type="password" onChange={({ target }) => setPassword(target.value)} placehoder="Password" />
                <br />
                <button type="submit">
                    Sign in
                </button>
            </form>
        </div>
    )
};

export default Signup