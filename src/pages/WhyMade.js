import React,{useState}  from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/FitnessCenter';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import {NavBarHome} from '../components/Navbar/data'
import Sidebar from '../components/Sidebar'
import {SidebarHome} from '../components/Sidebar/data'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: { 
    backgroundImage: 'url(https://source.unsplash.com/lJeAWbFfQUA)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide() {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen(!isOpen)
  }


  return (

    <React.Fragment>
      <CssBaseline />
      <Sidebar isOpen={isOpen} toggle={toggle} {...SidebarHome}/>
      <Navbar toggle={toggle} {...NavBarHome}/>



    <Grid container component="main" className={classes.root}>
    
      

      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6}>

        <div className={classes.paper} align = "left">
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
            Why it Was Made
          </Typography>

          <Typography variant="h5" align="center" color="textSecondary" paragraph>
              One day or day one? <b>You Decide</b>
              <br></br><br></br>
          </Typography>

          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography variant="h6" align="center" color="textSecondary" paragraph>
              <br></br><br></br>
              Everyone in our team has passion for fitness, so we decided to make an application
               for anyone that wants a diverse workout plan
              <br></br>   
          </Typography>

         

          <Typography variant="h6" align="center" color="textSecondary" paragraph>
              Whether you are a beginner or an expert, this workout plan will enhance your routine
               exercises. It is designed to specifically rotate different muscle groups and make 
               sure your body gets the exercise it needs to make you look incredible. Not everyone knows how to
               create a dynamic workout plan. Just focus on working your hardest and we will supply the structure. 
               If you have been working out for years, it's nice to have your workout automatically created for you each day. 
               If you really like the workout, you can save it and revisit the exercise whenever you feel like it. 
               Nothing is holding you back so try Workout planner today!
              <br></br><br></br>
              We sincerely thank you for incorporating Hercules' Notebook in your daily exercise, now go out there and get
               into the body of your dreams
          </Typography>

        </div>
      </Grid>
    <Grid item xs={false} sm={4} md={7} className={classes.image} />

      <Footer></Footer>
    </Grid>
    </React.Fragment>
  );
}