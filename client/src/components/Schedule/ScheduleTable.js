import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import moment from 'moment';
import EventIcon from '@material-ui/icons/Event';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import UpdateAppointment from './UpdateAppointment';
import { Link, withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import { connect } from 'react-redux';
import { getAppointments } from '../../actions/appointments';
import { ROLE_URL } from '../../Secrets/env';
import './Schedule.css'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 350,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },

  button: {
    margin: theme.spacing.unit
  }
});

class AppointmentsTable extends React.Component {
  state = { 
    search: '',
    selectedDate: null,
    date: ''
   }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getAppointments())
  }

  handleTableCells = () => {
    const { user, appointments } = this.props;
    const profile = user.profile;
    const role = profile[ROLE_URL];
    const filteredAppointments = this.props.appointments.filter(
      (appointment) => {
        const { search, date } = this.state;
        const fullName = appointment.first.toLowerCase() + appointment.last.toLowerCase()
        const filteredDate = date === '' ? '' : moment(this.state.date).format("MM/DD/YY")
        return (
          fullName.indexOf(search.toLowerCase()) !== -1 &&
          appointment.date.indexOf(filteredDate) !== -1
        )
      }
    );

    if (role[0] === 'admin') {
      if (appointments.length !== 0) {
        return filteredAppointments.map(a => {
          const time = a.time
          const formattedTime = moment(time, "hh:mm A").format("h:mm A")
          return (
            <TableRow key={a.id}>
              <TableCell component="th" scope="row">
                {a.first} {a.last}
              </TableCell>
              <TableCell align="right">{a.date}</TableCell>
              <TableCell align="right">{formattedTime}</TableCell>
              <TableCell align="right">{a.service}</TableCell>
              <TableCell align="right">${a.price}.00</TableCell>
              <TableCell align="right"><UpdateAppointment appointment={a} /></TableCell>
            </TableRow>
          )
        })
      } else {
        return (
          <TableRow>
            <TableCell>No Appointments Scheduled.</TableCell>
          </TableRow>
        )
      }
    } else {
      return (
        <TableRow>
          <TableCell>
            Must be signed in as admin to view Schedule
          </TableCell>
        </TableRow>
      )
    }
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleDateChange = selectedDate => {
    this.setState({ selectedDate: selectedDate });
    this.setState({ date: selectedDate });
  };

  render() {
    const { classes } = this.props;
    const { search, selectedDate } = this.state;

    return (
      <Paper className={classes.root}>
        <TextField
          id="standard-name"
          label="Search"
          className={classes.textField}
          value={search}
          onChange={this.handleChange('search')}
          margin="normal"
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            margin="normal"
            label="Date"
            value={selectedDate}
            onChange={this.handleDateChange}
            className={classes.textField}
          />
        </MuiPickersUtilsProvider>
        <IconButton className={classes.button} onClick={() => this.setState({ date: '', selectedDate: null, search: ''})} aria-label="Clear">
          <ClearIcon />
        </IconButton>
        <Link id="scheduleLink" to='/services'>
          <IconButton className={classes.button} aria-label="Book">
            <EventIcon />
          </IconButton>
        </Link>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Time</TableCell>
              <TableCell align="right">Service</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.handleTableCells()}
          </TableBody>
        </Table>
      </Paper>
    )
  };
}

AppointmentsTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    appointments: state.appointments,
    user: state.user
  }
}

export default connect(mapStateToProps)(withRouter(withStyles(styles)(AppointmentsTable)));