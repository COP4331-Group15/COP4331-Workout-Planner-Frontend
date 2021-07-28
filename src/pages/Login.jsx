import React, { useState } from "react";
import {Link} from "react-router-dom";
import {useHistory} from "react-router-dom";
import firebase from "../services/fire";
import './styles.css'; 
import Navbar from '../components/Navbar';
import {NavBarHome} from '../components/Navbar/data';
import Sidebar from '../components/Sidebar';
import {SidebarHome} from '../components/Sidebar/data';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';


const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const emailVerified = firebase.auth().currentUser;

    const handleSubmit = (e) => {
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(email, password).then(()=>{history.push("/")}).catch((error) => {
            console.error('Incorrect username or password');
        
        firebase.auth()
        });
    }


const history = useHistory()

const [isOpen, setIsOpen] = useState(false)

const toggle = () => {setIsOpen(!isOpen)}



    return (
        <>
        <Sidebar isOpen={isOpen} toggle={toggle} {...SidebarHome}/>
        <Navbar toggle={toggle} {...NavBarHome}/>

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
                    <input type="password" className="custom-control-input" onChange={({ target }) => setPassword(target.value)} className="form-control" placeholder="Enter password" />
                </div>
    
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-checkbox" id="customCheck1" />
                    <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                </div>
               
                <br></br>
                <button type="submit" class="button button1">Log In</button>
                <p className="new-login text-right">
                    New User? <a href="/signup">Create Account</a>
                </p>

    
            </div>
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        </form>
        <Footer></Footer>
        </>
    )
};

export default Login