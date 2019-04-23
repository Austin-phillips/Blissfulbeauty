import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Create';
import { updateAppointment, deleteAppointment } from '../../actions/appointments';
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
    maxHeight: '60vh',
    overflow: 'auto',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
    borderRadius: '20px'
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
  { key: '2', text: '10:15 AM', value: '10:15 AM', disabled: false },
  { key: '3', text: '10:30 AM', value: '10:30 AM', disabled: false },
  { key: '4', text: '10:45 AM', value: '10:45 AM', disabled: false },
  { key: '5', text: '11:00 AM', value: '11:00 AM', disabled: false },
  { key: '6', text: '11:15 AM', value: '11:15 AM', disabled: false },
  { key: '7', text: '11:30 AM', value: '11:30 AM', disabled: false },
  { key: '8', text: '11:45 AM', value: '11:45 AM', disabled: false },
  { key: '9', text: '12:00 PM', value: '12:00 PM', disabled: false },
  { key: '10', text: '12:15 PM', value: '12:15 PM', disabled: false },
  { key: '11', text: '12:30 PM', value: '12:30 PM', disabled: false },
  { key: '12', text: '12:45 PM', value: '12:45 PM', disabled: false },
  { key: '13', text: '1:00 PM', value: '1:00 PM', disabled: false },
  { key: '14', text: '1:15 PM', value: '1:15 PM', disabled: false },
  { key: '15', text: '1:30 PM', value: '1:30 PM', disabled: false },
  { key: '16', text: '1:45 PM', value: '1:45 PM', disabled: false },
  { key: '17', text: '2:00 PM', value: '2:00 PM', disabled: false },
  { key: '18', text: '2:15 PM', value: '2:15 PM', disabled: false },
  { key: '19', text: '2:30 PM', value: '2:30 PM', disabled: false },
  { key: '20', text: '2:45 PM', value: '2:45 PM', disabled: false },
  { key: '21', text: '3:00 PM', value: '3:00 PM', disabled: false },
  { key: '22', text: '3:15 PM', value: '3:15 PM', disabled: false },
  { key: '23', text: '3:30 PM', value: '3:30 PM', disabled: false },
  { key: '24', text: '3:45 PM', value: '3:45 PM', disabled: false },
  { key: '25', text: '4:00 PM', value: '4:00 PM', disabled: false },
  { key: '26', text: '4:15 PM', value: '4:15 PM', disabled: false },
  { key: '27', text: '4:30 PM', value: '4:30 PM', disabled: false },
];

const statusOptions = [
  {key: '1', text:'Update', value:'Update'},
  {key: '2', text:'Reschedule', value:'Reschedule'},
  {key: '3', text:'Complete', value:'Complete'},
  {key: '4', text:'Cancel', value:'Cancel'},
]

class UpdateAppointment extends React.Component {
  state = {
    open: false,
    service: this.props.appointment.service,
    price: this.props.appointment.price,
    length: this.props.appointment.length,
    selectedDate: this.props.appointment.date,
    formattedTime: this.props.appointment.time,
    first: this.props.appointment.first,
    last: this.props.appointment.last,
    email: this.props.appointment.email,
    uid: this.props.appointment.uid,
    notes: this.props.appointment.notes,
    filteredNumber: this.props.appointment.number,
    status: '',
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    const { service, price, length, selectedDate, time, first, last, email, notes, number } = this.props.appointment;
    this.setState({ open: false, service, price, length, selectedDate, formattedTime: time, first, last, email, notes, filteredNumber: number, status: '' });
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
    this.setState({ selectedDate: selectedDate, formattedTime: '' });
    this.HandleDisabled(selectedDate)
  };

  HandleDisabled = (date) => {
    const { appointments } = this.props;
    const last = available.length - 1
    const { length } = this.state;

    appointments.forEach((app) => available.forEach((time, index, array) => {

      var half = index + 1 <= last ? array[index + 1] : time
      var fourtyFive = index + 2 <= last ? array[index + 2] : time
      var hour = index + 3 <= last ? array[index + 3] : time
      var hourFifteen = index + 4 <= last ? array[index + 4] : time
      var hourHalf = index + 5 <= last ? array[index + 5] : time
      var hourfourtyFive = index + 6 <= last ? array[index + 6] : time
      var twoHour = index + 7 <= last ? array[index + 7] : time
      var twoHourFifteen = index + 8 <= last ? array[index + 8] : time
      var twoHourHalf = index + 9 <= last ? array[index + 9] : time
      var backHalf = index - 1 >= 0 ? array[index - 1] : time
      var backFourtyFive = index - 2 >= 0 ? array[index - 2] : time
      var backHour = index - 3 >= 0 ? array[index - 3] : time
      var backHourFifteen = index - 4 >= 0 ? array[index - 4] : time
      var backHourHalf = index - 5 >= 0 ? array[index - 5] : time
      var backHourfourtyFive = index - 6 >= 0 ? array[index - 6] : time
      var backTwoHour = index - 7 >= 0 ? array[index - 7] : time
      var backTwoHourFifteen = index - 8 >= 0 ? array[index - 8] : time
      var backTwoHourHalf = index - 9 >= 0 ? array[index - 9] : time

      function checkCurrentLength() {
        if (length === 30) {
          return (
            backHalf['disabled'] = true
          )
        } else if (length === 60) {
          return (
            backHalf['disabled'] = true,
            backFourtyFive['disabled'] = true,
            backHour['disabled'] = true
          )
        } else if (length === 90) {
          return (
            backHalf['disabled'] = true,
            backFourtyFive['disabled'] = true,
            backHour['disabled'] = true,
            backHourFifteen['disabled'] = true,
            backHourHalf['disabled'] = true
          )
        } else if (length === 120) {
          return (
            backHalf['disabled'] = true,
            backFourtyFive['disabled'] = true,
            backHour['disabled'] = true,
            backHourFifteen['disabled'] = true,
            backHourHalf['disabled'] = true,
            backHourfourtyFive['disabled'] = true,
            backTwoHour['disabled'] = true
          )
        } else if (length === 150) {
          return (
            backHalf['disabled'] = true,
            backFourtyFive['disabled'] = true,
            backHour['disabled'] = true,
            backHourFifteen['disabled'] = true,
            backHourHalf['disabled'] = true,
            backHourfourtyFive['disabled'] = true,
            backTwoHour['disabled'] = true,
            backTwoHourFifteen['disabled'] = true,
            backTwoHourHalf['disabled'] = true
          )
        }
      }
      if (app.date === moment(date).format("MM/DD/YY") && app.time === time['text']) {
        if (app.length === 30) {
          time['disabled'] = true
          half['disabled'] = true
          checkCurrentLength()
        } else if (app.length === 60) {
          time['disabled'] = true
          half['disabled'] = true
          fourtyFive['disabled'] = true
          hour['disabled'] = true
          checkCurrentLength()
        } else if (app.length === 90) {
          time['disabled'] = true
          half['disabled'] = true
          fourtyFive['disabled'] = true
          hour['disabled'] = true
          hourFifteen['disabled'] = true
          hourHalf['disabled'] = true
          checkCurrentLength()
        } else if (app.length === 120) {
          time['disabled'] = true
          half['disabled'] = true
          fourtyFive['disabled'] = true
          hour['disabled'] = true
          hourFifteen['disabled'] = true
          hourHalf['disabled'] = true
          hourfourtyFive['disabled'] = true
          twoHour['disabled'] = true
          checkCurrentLength()
        } else if (app.length === 150) {
          time['disabled'] = true
          half['disabled'] = true
          fourtyFive['disabled'] = true
          hour['disabled'] = true
          hourFifteen['disabled'] = true
          hourHalf['disabled'] = true
          hourfourtyFive['disabled'] = true
          twoHour['disabled'] = true
          twoHourFifteen['disabled'] = true
          twoHourHalf['disabled'] = true
          checkCurrentLength()
        } else {
          time['disabled'] = true
          checkCurrentLength()
        }
      } else if (moment(date).format('ddd') === 'Sun') {
        if (time.disabled === false) {
          time['disabled'] = true
        }
      } else if (moment(date).format('ddd') === 'Tue') {
        if (time.disabled === false) {
          time['disabled'] = true
        }
      } else if (moment(date).format('ddd') === 'Wed') {
        if (time.disabled === false) {
          time['disabled'] = true
        }
      } else if (moment(date).format('ddd') === 'Fri') {
        if (time.disabled === false) {
          time['disabled'] = true
        }
      } else if (moment(date).format('ddd') === 'Sat') {
        if (time.disabled === false) {
          time['disabled'] = true
        }
      }
    }))
  }

  handleSubmit = (e) => {
    const { dispatch } = this.props;
    const { first, last, selectedDate, formattedTime, service, email, notes, length, uid, price, filteredNumber, status } = this.state;
    const { id } = this.props.appointment;
    const date = moment(selectedDate).format("MM/DD/YY")
    const number = filteredNumber.replace(/\D/g, '')
    const time = moment(formattedTime, "h:mm A").format("hh:mm A")

      if (status === 'Update') {
        dispatch(updateAppointment({ first, last, date, service, email, notes, length, uid, price, time, number, status}, id))
        this.setState({ open: false })
    } else if (status === 'Reschedule') {
        dispatch(updateAppointment({ first, last, date, service, email, notes, length, uid, price, time, number, status }, id))
        this.setState({ open: false })
    } else if (status === 'Complete') {
      const deleted = window.confirm('Are you sure you want to save as complete?')
      if (deleted)
        dispatch(deleteAppointment(id, status, number))
        this.setState({ open: false })
    } else if (status === 'Cancel') {
      const deleted = window.confirm('Are you sure you want to cancel?')
      if (deleted)
        dispatch(deleteAppointment(id, status, number))
        this.setState({ open: false })
    }
  }

  handleButtons = () => {
    const { status } = this.state;

    if (status === '') {
      return(
        <div>
          <Button disabled id='scheduleSaveButton' onClick={() => this.handleSubmit()}>Save</Button>
          <Button id='cancelButton' onClick={() => this.handleClose()}>Close</Button>
        </div>
      )
    } else {
      return (
        <div>
          <Button id='scheduleSaveButton' onClick={() => this.handleSubmit()}>Save</Button>
          <Button id='cancelButton' onClick={() => this.handleClose()}>Close</Button>
        </div>
      )
    }
  }

  render() {
    const { classes } = this.props;
    const { service, price, length, selectedDate, formattedTime, first, last, email, notes, filteredNumber, status } = this.state;
    const time = moment(formattedTime, "hh:mm A").format("h:mm A")

    return (
      <div>
        <IconButton onClick={this.handleOpen} aria-label="Edit">
          <EditIcon />
        </IconButton>
        <Modal
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant='h5' align='center'>Appointment Information</Typography>
            <form className={classes.container} noValidate autoComplete="off">
              <TextField
                id="standard-required"
                label="First Name"
                className={classes.textField}
                value={first}
                onChange={this.handleChange('first')}
                margin="normal"
              />
              <TextField
                id="standard-required"
                label="Last Name"
                className={classes.textField}
                value={last}
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
                label="Time"
                className={classes.textField}
                value={time}
                onChange={this.handleChange('formattedTime')}
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
              <TextField
                id="standard-required"
                label="Phone Number"
                className={classes.textField}
                value={filteredNumber}
                onChange={this.handleChange('filteredNumber')}
                margin="normal"
              />
              <TextField
                id="outlined-multiline-flexible"
                label="Notes"
                multiline
                rowsMax="4"
                value={notes}
                onChange={this.handleChange('notes')}
                className={classes.textField}
                margin="normal"
              />
              <TextField
                id="standard-required"
                required
                select
                label="Status"
                className={classes.textField}
                value={status}
                onChange={this.handleChange('status')}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
                margin="normal"
              >
                {statusOptions.map(s => (
                  <MenuItem key={s.key} value={s.text}>
                    {s.text}
                  </MenuItem>
                ))}
              </TextField>
            </form>
            {this.handleButtons()}
          </div>
        </Modal>
      </div>
    );
  }
}

UpdateAppointment.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return { appointments: state.appointments, user: state.user }
}

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(UpdateAppointment);

export default connect(mapStateToProps)(SimpleModalWrapped);