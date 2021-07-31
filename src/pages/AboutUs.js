import React, {useState}  from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
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
    paddingRight: '96.25%',
    paddingBottom: '.0015%',
  },
  cardContent: {
    flexGrow: 1,
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
              Meet our Development Team!
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              We are group 15 and are all very excited to show you the React application we have
              built. <br></br><br></br>A very special shoutout goes to our project manager Thomas 
              Stoeckert who has been an outstanding leader and has excelled our project to look 
              like the professional web and mobile application that you are using now!
            </Typography>

          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards1.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/lASNybFhPOg/3500x3500"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                    Thomas Stoeckert
                    </Typography>
                    <Typography>
                      Project manager, lead team meetings and presentations. Worked in front and back-end Development.

                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}


            {cards1.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/otgGL2YSnRU/3500x3500"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                    Timothy Golio
                    </Typography>
                    <Typography>
                      Back-end developer. Created the initial draft for this application and made many endpoints.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}

            {cards1.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/XEvjnt4AqjE/3500x3500"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                    Nicholas Habryl
                    </Typography>
                    <Typography>
                      Back end and mobile developer. Created endpoints and most of the mobile user interface.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}

            {cards1.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/btksMxPpF0s/3500x3500"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                    Ricky Egawa
                    </Typography>
                    <Typography>
                      Front end development leader. Created the homepage and most of the user interface.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}

            {cards1.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/4BR5eOCD6mI/3500x3500"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                    Isaiah Kovacich
                    </Typography>
                    <Typography>
                     Front end developer. Created functionality and user interface for connecting with the API endpoints.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}

            {cards1.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/sZ07H1hRaxU/3500x3500"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                    Ryan Kendrick
                    </Typography>
                    <Typography>
                      Front end developer, graphics designer. Made contributions to the front end pages and created the workout icons.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}

          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Footer></Footer>
      {/* End footer */}
    </React.Fragment>
  );
}