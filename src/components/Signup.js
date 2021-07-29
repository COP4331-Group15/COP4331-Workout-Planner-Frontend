import React from 'react';
import React, { Component } from "react";


function Signup()
{
    const doSignup = async event => 
    {
        event.preventDefault();

        alert("Do it.");
    }

    return (
        <div id="signupDiv">
            <form onSubmit={doLogin}>
                <span id="inner-title">PLEASE SIGN UP</span><br />
                <input type="text" id="signupFirst" placeholder="Password" /><br />
                <input type="password" id="signupLast" placeholder="Password" /><br />
                <input type="text" id="signupName" placeholder="Username" /><br />
                <input type="password" id="signupPassword" placeholder="Password" /><br />                
                <input type="submit" id="signupButton" class="buttons" value="Do It" onClick={doSignup}/>
            </form>
            <span id="loginResult"></span>
        </div>
    );
};

export default Login;
