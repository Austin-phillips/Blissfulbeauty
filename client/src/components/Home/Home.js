import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import AboutMeCards from './AboutMeCards';
import Typography from '@material-ui/core/Typography';
import ImageCarousel from './ImageCarousel';
import { Link, withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import './Home.css';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class Home extends Component {

  render() {
    const { classes } = this.props;
    return(
      <div>
        {/* Top image and title */}
        <div id="img-container">
          <div id="inner-container">
            <h1>blissful beauty</h1>
            <Link id="homePageLinks" to='/services'><Button id="topBookButton" size='large'>Book Now</Button></Link>
          </div>
        </div>
        {/* About me section */}
        <div id="aboutMeContainer">
          <div id="aboutMeGrid">
            <Grid container spacing={24}>
              <Grid item xs={12} sm={5}>
                <AboutMeCards />
              </Grid>
              <Grid item xs={12} sm={7}>
                <div id='bodyContainer'>
                  <div id="aboutMeBodyContainer">
                    <Typography id="header" className={classes.header} align='left' gutterBottom>
                      About Me
                    </Typography>
                    <Typography id="aboutMeBody" variant="body1" gutterBottom align='justify'>
                      body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
                      unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
                      dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam. body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
                      unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
                      dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
                    </Typography>
                    <Link id='homePageLinks' to='/services'><Button id="aboutMeButton">View Services</Button></Link>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
        {/* Gallery */}
        <div id="whiteContainer">
          <Typography id="header" className={classes.header} align='center' gutterBottom>
            Gallery
          </Typography>
          <ImageCarousel />
          <Link id='homePageLinks' to='/gallery'><Button id="aboutMeButton">View More Photos</Button></Link>
        </div>
      </div>
    )
  }
};

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(Home));