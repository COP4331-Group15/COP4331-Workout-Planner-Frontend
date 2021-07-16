
import React, { useState } from "react";
import {Link} from "react-router-dom";
import firebase from "../services/fire";

const Signup = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [firstName, setFirst] = useState();
    const [lastName, setLast] = useState();

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
        <form onSubmit = {handleSubmit}>
            <h1>! </h1>
            <div class = "container3">
                <div>
                <h1>Exercise Planner</h1>    
                <h2>Sign Up</h2>
              

                <div className="form-group">
                    <label>First name</label>
                    <input type="text" onChange={({ target }) => setFirst(target.value)}className="form-control" placeholder="First name" />
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" onChange={({ target }) => setLast(target.value)}className="form-control" placeholder="Last name" />
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" onChange={({ target }) => setEmail(target.value)} className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" onChange={({ target }) => setPassword(target.value)}className="form-control" placeholder="Enter password" />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                <p className="new-login text-right">
                    Already registered <a href="login">Log in</a>
                </p>
          
                    
                </div>
              
            </div>
        </form>
    )
};

export default Signup
