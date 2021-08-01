import React, { useState } from 'react';
import './App.css';

import firebase from 'firebase'

import { 
  BrowserRouter as Router, 
  Switch, 
  Route, 
  Redirect

} from 'react-router-dom';

// import { ThemeProvider } from '@material-ui/core/styles';
// import theme from './config/theme.config';

import Home from './pages/Home';
// import Calendar from './pages/Calendar';
// import Login from './pages/Login';
// import TestPage from './pages/TestPage';
import Edit_Split from './pages/Edit_Split';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  firebase.auth().onAuthStateChanged((user) => {
    return user ? setIsLoggedIn(true) : setIsLoggedIn(false);
  });

  console.log('logged in?', isLoggedIn);

  return (
    <Router>
      {!isLoggedIn ? (
        <>
          <Switch>
            {/* <Route path="/signup"><SignUp /></Route> */}
            {/* <Route path='/calendar' component={Calendar} exact /> */}
            <Route path='/' component={Home} exact />
            {/* <ThemeProvider theme={theme}> */}
            {/* <Route path="/login"><Login /></Route> */}
            {/* <Route path="/signup1"><SignUp /></Route> */}
            {/* <Route path="/testpage"><TestPage /></Route> */}
            <Route path='/signin'><SignIn /></Route>
            <Route path="/signup"> <SignUp /> </Route>
            {/* <Route path="/dashboard">
              <Redirect to="/signin"/>
              </Route>
            <Route path="/edit">
              <Redirect to="/signin"/>
              </Route> */}
            
            {/* </ThemeProvider>          */}
          </Switch>
        </>
      ) : (
        <>
        <Route path="/signin"><SignIn/>
          </Route>
        {/* <Route path="/signup"><SignUp/>
          </Route> */}
        <Route path="/dashboard"><Dashboard /></Route>
        <Route path="/edit"><Edit_Split /></Route>
        {/* <Route path='/'> 
        <Redirect to="/dashboard"/>
        </Route> */}
        </>
      )}
    </Router>
  );
}

export default App;
