import React, { useState } from 'react';
import { withFirebase } from '../services';
import { Link, withRouter } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';

import useStyles from '../config/theme.signinup';
import Copyright from '../components/Copyright';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import firebase from 'firebase';

const theme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: '#01BF71',
    },
    background: {
      paper: "#010606"
    }
  }
})

function SignUp(props) {
  const classes = useStyles();

  const initialUser = {id: null, name: '', email: '', password: '', error: null, auth: null}

  const [user, setUser] = useState(initialUser);

  const handleChange = e => {
    const {name, value} = e.target;
    setUser({...user, [name]: value})
  }

  const handleSubmit = e => {
    props.firebase.auth.createUserWithEmailAndPassword(user.email, user.password)
    .then(async authUser => {
      await sendVerificationEmail();
      props.history.push("/");
      await firebase.auth().signOut();
      // Create a user in the Firebase realtime database
      return props.firebase
        .user(authUser.user.uid)
        .set({
          username: user.name,
          email: user.email,
          activities: 'not set'
        });
    })
    .then(authUser => {
      setUser(initialUser);
    })
    .catch(error => {
      setUser({...user, error: error.message})
    });
  }

  const sendVerificationEmail = async () => {
    await firebase.auth().currentUser.sendEmailVerification()
    window.alert("The Verification link is sent to your e-mail address. please check your inbox to verify your account");
  }

  const isValid = user.name === '' || user.email === '' || user.password === '';

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form 
            className={classes.form} 
            noValidate
            onSubmit={e => e.preventDefault()}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoFocus
              value={user.name}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
            />
            <Typography className={classes.error}>
              {user.error ? user.error : ''}
            </Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
              disabled={isValid}
            >
              Sign up
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/signin">
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
    </ThemeProvider>
    
  );
};

export default withRouter(withFirebase(SignUp));