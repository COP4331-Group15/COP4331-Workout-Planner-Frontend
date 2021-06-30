import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import fire from './fire';

import LoginPage from './pages/LoginPage';
import TestPage from './pages/TestPage';
import Login from './pages/Login';
import SignUp from './pages/Signup';

function App() {


  const [isLoggedIn, setIsLoggedIn] = useState(false);

  fire.auth().onAuthStateChanged((user) => {
    return user ? setIsLoggedIn(true) : setIsLoggedIn(false);
  });

  console.log('logged in?', isLoggedIn);

  const signOut = () => {
    fire.auth().signOut();
  }

  return (
    <Router>
      {!isLoggedIn ? (
        <>
          <Switch>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/">
              <Login />
            </Route>
          </Switch>
        </>
      ) : (
        <>
          <span onClick={signOut}>
            <a href="#">Sign Out</a>
          </span>
          <Switch>
            <Route path="/">
              <TestPage />
            </Route>
          </Switch>
        </>
      )}
    </Router>
  );
}

export default App;
