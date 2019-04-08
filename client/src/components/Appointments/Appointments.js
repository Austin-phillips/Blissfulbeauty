import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Table from './AppointmentsTable';
import Grid from '@material-ui/core/Grid';
import './Appointment.css';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  header: {
    marginTop: '25px',
  }
});

class Appointments extends React.Component {

  render() {
  const { classes, isAuthenticated } = this.props;

  return (
    <div className={classes.root}>
      <Typography className={classes.header} align='center' variant="h2" gutterBottom>
        Appointments
      </Typography>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <div id='table'>
            { isAuthenticated ?
              <Button href='/services' id='servicesLink'>Book Appointment</Button> :
              null
            }
            <Table />
          </div>
        </Grid>
      </Grid>
    </div>
  )};
};

Appointments.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return { isAuthenticated: state.user.isAuthenticated }
}

export default connect(mapStateToProps)(withStyles(styles)(Appointments));