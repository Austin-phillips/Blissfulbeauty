import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Table from './AppointmentsTable';
import Grid from '@material-ui/core/Grid';
import './Appointment.css';
import { Link, withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';

const styles = theme => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  header: {
    marginTop: '25px',
  }
});

class Appointments extends React.Component {

  render() {
  const { classes, isAuthenticated } = this.props;

  return (
    <div id="appointmentsContainer">
      <Typography className={classes.header} align='center' variant="h2" gutterBottom>
        Appointments
      </Typography>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <div id='table'>
            { isAuthenticated ?
              <Link id="appointmentLink" to='/services'><Button id='servicesLink'>Book Appointment</Button></Link> :
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

export default connect(mapStateToProps)(withRouter(withStyles(styles)(Appointments)));