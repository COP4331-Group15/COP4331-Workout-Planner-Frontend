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
              Terms of Service
            </Typography>
            <Typography variant="h5" align="left" color="textSecondary" paragraph>
            This set of terms and conditions is based upon our subscription website terms and conditions document. In addition to the provisions of that document, 
            this one includes a detailed disclaimer relating to health and fitness information. <br></br><br></br> 
            </Typography>
            <Typography variant="h6" align="left" color="textPrimary" paragraph>
              <ol>
                <li><b>Introduction:</b> document governs website use; consent to website document: implied; consent to website terms and conditions: express; website user minimum age.</li>
                <li><b>Copyright notice:</b> UCC copyright notice; ownership of rights in website.</li>
                <li><b>Permission to use website:</b> licence to use website; no downloading; website use: permitted purposes; no modification of website content;
                   limitations on licence to use website; redistributable content; suspension or restriction of access to website.</li>
                <li><b>Misuse of website:</b> acceptable use: prohibitions; using contact details prohibited; veracity of information supplied.</li>
                <li><b>Use on behalf of organisation:</b> use on behalf of another.</li>
                <li><b>Registration and accounts:</b> account eligibility; account registration process; no other person permitted to use account; 
                   notify on misuse of account; use of another's account.</li>
                <li><b>User login details:</b> provision of login details; user ID rules and impersonation; password to be kept confidential; notify on disclosure of password; responsibility for password loss.</li>
                <li><b>Distance contracts: cancellation right:</b> cancellation right for consumers; cancellation right for services and digital content; consumer agreement to provision of services; exercise of 
                   cancellation right; refund upon services distance contract cancellation; refund method; refund timing for services and digital content.</li>
                <li><b>Rules about your content:</b> user content warranty; no unlawful user content; user content rules.</li>
                <li><b>Health and fitness information:</b> website contains general information; information is not advice; no representations or warranties in relation to information; no warranties in relation 
                  to availability or accuracy etc of information; responsibility for acting on exercise information; no changes to diet etc without consulting professional; medical information not alternative to 
                  advice; consult healthcare provider regarding specific medical questions; seek immediate attention for medical conditions; no delaying medical advice etc; website includes interactive features; 
                  assistance through website may be incomplete; interactive feature assistance not advice; no liability for reliance upon information.</li>
                <li><b>Limited warranties:</b> no warranties for information; right to discontinue website publication; no implied warranties or representations relating to website.</li>
                <li><b>Limitations and exclusions of liability:</b> caveats to limits of liability (with consumer protection); interpretation of limits of liability; no liability for free information or services; 
                  no liability for force majeure; no liability for business losses; no liability for loss of data or software (with consumer protection); no liability for consequential loss (with consumer protection); 
                  no personal liability; liability cap upon services contract.</li>
                <li><b>Indemnity:</b> indemnity from website users.</li>
                <li><b>Breaches of these terms and conditions:</b> consequences of breach; non circumvention of measures upon breach.</li>
                <li><b>Third party websites:</b> third party websites: hyperlinks not recommendations; third party websites: no control or liability.</li>
                <li><b>Trade marks:</b> trade mark ownership; third party trade marks on website.</li>
                <li><b>Variation:</b> document may be revised; variation of website document: unregistered users; variation of website document: consumers.</li>
                <li><b>Assignment:</b> assignment by first party (with consumer rights); assignment by second party.</li>
                <li><b>Severability:</b> severability of whole; severability of parts.</li>
                <li><b>Third party rights:</b> third party rights: benefit; third party rights: exercise of rights.</li>
                <li><b>Entire agreement:</b> entire agreement - use of website.</li>
                <li><b>Law and jurisdiction:</b> governing law; jurisdiction.</li>
                <li><b>Statutory and regulatory disclosures:</b> copy of document not filed; language of document; ecommerce regulations: trade register; ecommerce regulations: authorisation scheme; ecommerce regulations: 
                  professionals; ecommerce regulations: code of conduct; value added tax number.</li>
                <li><b>Our details:</b>website operator name; company registration details; place of business; contact information.</li>
              </ol>

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
                    image="https://source.unsplash.com/TX2jzir6n4E/3500x3500"
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
                    image="https://source.unsplash.com/YLN4b23Wjf0/3500x3500"
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
                    image="https://source.unsplash.com/sHfo3WOgGTU/3500x3500"
                    title="Image title"
                  />
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