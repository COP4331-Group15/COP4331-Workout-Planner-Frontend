import React, { useState } from "react";
import {Link} from "react-router-dom";
import firebase from "../services/fire";
import './styles.css'; 

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
        <form onSubmit = {handleSubmit}>
            <br /><br /><br />
            <div class = "container2">
                
                <h1>Log In</h1><br></br>

                <div className="form-group">
                    <label>Email address:</label><br></br>
                    <input type="email" onChange={({ target }) => setEmail(target.value)} className="form-control" placeholder="Enter email" />
                </div>
                <br></br>
                <div className="form-group">
                    <label>Password:</label><br></br>
                    <input type="password" onChange={({ target }) => setPassword(target.value)} className="form-control" placeholder="Enter password" />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>
                <br></br>
                <button type="submit" class="button button1">Log In</button>
                <p className="new-login text-right">
                    New User? <a href="/signup">Create Account</a>
                </p>
    
            </div>

        </form>
        
    
    )
};

export default Login