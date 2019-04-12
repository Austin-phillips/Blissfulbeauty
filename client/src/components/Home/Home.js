import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import './Home.css';
import AboutMeCards from './AboutMeCards';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';

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
        <div id="img-container">
          <div id="inner-container">
            <h1>blissful beauty</h1>
          </div>
        </div>
        <Typography id="aboutMeHeader" className={classes.header} align='center' gutterBottom>
          About Me
        </Typography>
        <div id="aboutMeGrid">
          <Grid container spacing={24}>
            <Grid item xs={12} sm={6} md={4}>
              <AboutMeCards />
            </Grid>
            <Grid item xs={12} sm={6} md={8}>
              <div id='bodyContainer'>
                <div id="aboutMeBodyContainer">
                  <Typography id="aboutMeBody" variant="body1" gutterBottom align='justify'>
                    body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
                    unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
                    dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam. body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
                    unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
                    dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
                  </Typography>
                  <Button id="aboutMeButton">View Services</Button>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    )
  }
};

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);