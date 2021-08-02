import React, {useState}  from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

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
/*Styles*/
const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '96.25%', // 16:9

  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const cards1 = [1];

export default function Album() {
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

      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              How It Works
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              We have created the perfect workout for individuals that have no experience
              in rotating the muscle sets during a daily workout. <br></br><br></br> 
            </Typography>

          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards1.map((card) => (
              <Grid item key={card} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/22L7do1cOho/3500x3500"
                    title="Image title"
                  />
                </Card>
              </Grid>
            ))}


            {cards1.map((card) => (
              <Grid item key={card} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/Ve8xC9OVkGU/3500x3500"
                    title="Image title"
                  />
                </Card>
              </Grid>
            ))}

            {cards1.map((card) => (
              <Grid item key={card} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/hQtMTBm2zJE/3500x3500"
                    title="Image title"
                  />
                </Card>
              </Grid>
            ))}
            
          </Grid>
        </Container>

        <Container maxWidth="sm" > 
          <Typography variant="h5" align="left" color="textSecondary" paragraph>
              Once logged in, you will be able to view our calendar
              <br></br><br></br>
              On this page, you can edit different components of your workout depending 
              on your preference
              <br></br><br></br>
              <b>These components include</b>
              <br></br><br></br>
              <ul>
                <li>    Type: Cardio, Resistance, Other </li>
                <li>    Muscle Group: Pectorals, Biceps, Deltoids, Other</li>
                <li>    Duration: Length of workout in minutes</li>
                <li>    Repetition: Choose how many times to repeat a workout</li>
                <li>    Resistance: How much weight resistance you want to add</li>
              </ul> 
              <br></br><br></br>
              You can save any workout and keep it as a favorite to be replayed whenever you choose
              <br></br><br></br>
              Otherwise, just log on and we will create a new exercise for you!
            </Typography>
            <Typography component="h1" variant="h4" align="left" color="textSecondary" gutterBottom>
              Stop Wishing, Start <b>Doing</b>
              <b><b></b></b>
            </Typography>
            

          </Container>


      </main>
      {/* Footer */}
      <Footer></Footer>
      {/* End footer */}
    </React.Fragment>
  );
}