import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ServiceCard from './ServiceCard';
import Typography from '@material-ui/core/Typography';
import './Service.css';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  header: {
    marginTop: '25px',
  }
});

function Services(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Typography className={classes.header} align='center' variant="h2" gutterBottom>
        Services
      </Typography>      <Grid container spacing={24}>
        <Grid item xs={12}>
          <ServiceCard />
        </Grid>
      </Grid>
    </div>
  );
}

Services.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Services);