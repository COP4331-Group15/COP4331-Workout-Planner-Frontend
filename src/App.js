import React, { useState } from 'react';
import './App.css';

import fire from './services/fire';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Calendar from './pages/Calendar';
import Login from './pages/Login';
import SignUp from './pages/Signup';
//import TestPage from './pages/TestPage';
import Edit_Split from './pages/Edit_Split';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  fire.auth().onAuthStateChanged((user) => {
    return user ? setIsLoggedIn(true) : setIsLoggedIn(false);
  });

  console.log('logged in?', isLoggedIn);

  // const signOut = () => {
  //   fire.auth().signOut();
  // }
  return (
    <Router>
      {!isLoggedIn ? (
        <>
          <Switch>
            {/* <Route path="/signup"><SignUp /></Route> */}
            <Route path='/calendar' component={Calendar} exact />
            <Route path='/' component={Home} exact />
            <Route path="/login"><Login /></Route>
            <Route path="/signup1"><SignUp /></Route>
            <Route path="/edit"><Edit_Split /></Route>         
          </Switch>
        </>
      ) : (
        <>
          <Switch>
            <Route path='/' component={Calendar} exact />
            <Route path="/edit"><Edit_Split /></Route>     
          </Switch>
        </>
      )}
    </Router>
  );
}

export default App;
