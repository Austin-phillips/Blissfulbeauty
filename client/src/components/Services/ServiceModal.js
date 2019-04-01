import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import auth0Client from '../../Auth';
import moment from 'moment';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { addAppointment } from '../../actions/appointments';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: '80%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
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

class ServiceModal extends React.Component {
  state = {
    open: false,
    service: this.props.service.name,
    price: this.props.service.price,
    length: this.props.service.length,
    selectedDate: null,
    time: '',
    first: '',
    last: '',
    email: auth0Client.getProfile().email,
    uid: auth0Client.getProfile().sub,
    notes: '',
    messageOpen: false
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleDateChange = selectedDate => {
    available.forEach((time) => {
      if (time.disabled === true) {
        time['disabled'] = false
      }
    })
    this.setState({ selectedDate: selectedDate });
    this.HandleDisabled(selectedDate)
  };

  HandleDisabled = (date) => {
    const { appointments } = this.props;

    appointments.forEach((app) => available.forEach((time, index, array) => {
      if (app.date === moment(date).format("M/D/YY") && app.time === time['text']) {
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
    e.preventDefault()
    const { dispatch } = this.props;
    const { first, last, selectedDate, time, service, email, notes, length, uid, price } = this.state;
    const date = moment(selectedDate).format("M/D/YY")
    dispatch(addAppointment({ first, last, date, time, service, email, notes, length, uid, price }));
    this.setState({ open: false })
  }

  render() {
    const { classes } = this.props;
    const { selectedDate, service, price, length, email } = this.state;

    return (
      <div>
          <Button onClick={this.handleOpen}>Book Appointment</Button>
        <Modal
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant='h5' align='center'>Please fill out the form</Typography>
            <form className={classes.container} noValidate autoComplete="off">
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
                  value={selectedDate}
                  onChange={this.handleDateChange}
                  className={classes.textField}
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
            </form>
              <Button onClick={() => this.setState({ open: false})}>Cancel</Button>
              <Button onClick={() => this.handleSubmit()}>Book Now</Button>
          </div>
        </Modal>
      </div>
    );
  }
}

ServiceModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return { appointments: state.appointments}
}

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(ServiceModal);

export default connect(mapStateToProps)(SimpleModalWrapped);