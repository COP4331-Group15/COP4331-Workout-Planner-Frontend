import React, { useState } from "react";
import {Link} from "react-router-dom";
import firebase from "../services/fire";

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(email, password).catch((error) => {
            console.error('Incorrect username or password');
        });
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={({ target }) => setEmail(target.value)} placeholder="Email" />
                <br />
                <input type="password" onChange={({ target }) => setPassword(target.value)} placehoder="Password" />
                <br />
                <button type="submit">
                    Sign in
                </button>
            </form>
            <Link to="/signup">Sign Up</Link>
        </div>
    )
};

export default Login