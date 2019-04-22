import React from 'react';
import Typography from '@material-ui/core/Typography';
import Table from './AppointmentsTable';
import Grid from '@material-ui/core/Grid';
import './Appointment.css';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Divider } from '@material-ui/core';

class Appointments extends React.Component {

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
  const { isAuthenticated } = this.props;

  return (
    <div id="appointmentsContainer">
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <div id='table'>
            <Typography id="appointmentsHeader" align='center' variant="h4" gutterBottom>
              Appointments
            </Typography>
            <Divider id="appointmentsDivider" />
            { isAuthenticated ?
              <Link id="appointmentLink" to='/services'><Button id='servicesLink'>Book Appointment</Button></Link> :
              null
            }
            <p id="appointmentSlideText">{'(Slide <--> to view table)'}</p>
            <Table />
          </div>
        </Grid>
      </Grid>
    </div>
  )};
};

const mapStateToProps = (state) => {
  return { isAuthenticated: state.user.isAuthenticated }
}

export default connect(mapStateToProps)(withRouter((Appointments)));