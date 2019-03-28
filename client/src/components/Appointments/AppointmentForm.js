import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import { connect } from 'react-redux';
import auth0Client from '../../Auth';
import './Appointment.css'
import { addAppointment } from '../../actions/appointments';
import moment from 'moment';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  grid: {
    width: '60%',
  },
});

const available = [
  { key: '1', text: '10:00 AM', value: '10:00 AM', disabled: false },
  { key: '2', text: '10:30 AM', value: '10:30 AM', disabled: false },
  { key: '3', text: '11:00 AM', value: '11:00 AM', disabled: false },
  { key: '4', text: '11:30 AM', value: '11:30 AM', disabled: false },
  { key: '5', text: '12:00 PM', value: '12:00 PM', disabled: false },
  { key: '6', text: '12:30 PM', value: '12:30 PM', disabled: false },
  { key: '7', text: '1:00 PM', value: '1:00 PM', disabled: false },
  { key: '8', text: '1:30 PM', value: '1:30 PM', disabled: false },
  { key: '9', text: '2:00 PM', value: '2:00 PM', disabled: false },
  { key: '10', text: '2:30 PM', value: '2:30 PM', disabled: false },
  { key: '11', text: '3:00 PM', value: '3:00 PM', disabled: false },
  { key: '12', text: '3:30 PM', value: '3:30 PM', disabled: false },
  { key: '13', text: '4:00 PM', value: '4:00 PM', disabled: false },
  { key: '14', text: '4:30 PM', value: '4:30 PM', disabled: false },

]

class AppointmentForm extends React.Component {
  state = { service: this.props.service.name,
            price: this.props.service.price, 
            length: this.props.service.length,
            date: null,
            time:'',
            first: '',
            last: '',
            email: auth0Client.getProfile().email,
            uid: auth0Client.getProfile().sub,
            notes: ''
          };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleDateChange = date => {
    available.forEach((time) => {
      if (time.disabled === true) {
        time['disabled'] = false
      }
    })
    this.setState({ date: moment(date).format('MMMM Do YYYY') });
    this.HandleDisabled(date)
  };

  HandleDisabled = (date) => {
    const { appointments } = this.props;

    appointments.forEach((app) => available.forEach((time, index, array) => {
      if (app.date === date && app.time === time['text']) {
        if (app.length === 60) {
          var hour = array[index + 1]
          time['disabled'] = true
          hour['disabled'] = true
        } else if (app.length === 90) {
          var hour = array[index + 1]
          var hourhalf = array[index + 2]
          time['disabled'] = true
          hour['disabled'] = true
          hourhalf['disabled'] = true
        } else if (app.length === 120) {
          var hour = array[index + 1]
          var hourhalf = array[index + 2]
          var twohour = array[index + 3]
          time['disabled'] = true
          hour['disabled'] = true
          hourhalf['disabled'] = true
          twohour['disabled'] = true
        } else if (app.length === 180) {
          var hour = array[index + 1]
          var hourhalf = array[index + 2]
          var twohour = array[index + 3]
          var twohourhalf = array[index + 4]
          time['disabled'] = true
          hour['disabled'] = true
          hourhalf['disabled'] = true
          twohour['disabled'] = true
          twohourhalf['disabled'] = true
        } else {
          time['disabled'] = true
        }
      }
    }))
  }

  handleSubmit = (e) => {
    const { dispatch } = this.props;
    const { first, last, date, time, service, email, notes, length, uid, price } = this.state;
    dispatch(addAppointment({ first, last, date, time, service, email, notes, length, uid, price }));
    this.setState({ modalOpen: false })
  }


  render() {
    const { classes } = this.props;
    const { date, service, price, length, email } = this.state;

    return (
      <form className={classes.container} noValidate autoComplete="off">
      {console.log(auth0Client.getProfile())}
        <TextField
          id="standard-required"
          label="First Name"
          className={classes.textField}
          value={this.state.first}
          onChange={this.handleChange('first')}
          margin="normal"
        />
        <TextField
          id="standard-required"
          label="Last Name"
          className={classes.textField}
          value={this.state.last}
          onChange={this.handleChange('last')}
          margin="normal"
        />
        <TextField
          id="standard-read-only-input"
          label="Email"
          defaultValue={email}
          className={classes.textField}
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id="standard-read-only-input"
          label="Service"
          defaultValue={service}
          className={classes.textField}
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id="standard-read-only-input"
          label="Price"
          defaultValue={`$${price}.00`}
          className={classes.textField}
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id="standard-read-only-input"
          label="Length"
          defaultValue={`${length} min`}
          className={classes.textField}
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            margin="normal"
            label="Date picker"
            value={date}
            onChange={this.handleDateChange}
          />
        </MuiPickersUtilsProvider>
        <TextField
          id="standard-required"
          select
          label="Select"
          className={classes.textField}
          value={this.state.time}
          onChange={this.handleChange('time')}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="Please select a time"
          margin="normal"
        >
          {available.map(a => (
            <MenuItem key={a.key} value={a.text} disabled={a.disabled}>
              {a.text}
            </MenuItem>
          ))}
        </TextField>
        <Button onClick={() => this.handleSubmit()}>Book Now</Button>
      </form>
    );
  }
}

AppointmentForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return { appointments: state.appointments}
}

export default connect(mapStateToProps)(withStyles(styles)(AppointmentForm));