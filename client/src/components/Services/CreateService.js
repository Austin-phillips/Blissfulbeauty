import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import { addService } from '../../actions/services';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import './Service.css'

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

const time = [
  { key: '1', text: '15', value: '15' },
  { key: '2', text: '30', value: '30' },
  { key: '3', text: '60', value: '60' },
  { key: '4', text: '90', value: '90' },
  { key: '5', text: '120', value: '120' },
  { key: '6', text: '180', value: '180' },
]

class CreateService extends React.Component {
  state = {
    open: false,
    name: '',
    price: '',
    description: '',
    length: '',
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

  handleSubmit = (e) => {
    const { dispatch } = this.props;
    const { name, price, length, description } = this.state;
    dispatch(addService({ name, price, length, description }));
    this.setState({ open: false });
  }

  render() {
    const { classes } = this.props;
    const { name, price, description, length } = this.state;

    return (
      <div>
        <IconButton id='addButton' onClick={this.handleOpen} aria-label="Edit">
          <AddIcon />
        </IconButton>
        <Modal
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant='h5' align='center'>Update Service</Typography>
            <form className={classes.container} noValidate autoComplete="off">
              <TextField
                id="standard-required"
                label="Service Name"
                className={classes.textField}
                value={name}
                onChange={this.handleChange('name')}
                margin="normal"
              />
              <TextField
                id="standard-required"
                label="Price"
                className={classes.textField}
                value={price}
                onChange={this.handleChange('price')}
                margin="normal"
              />
              <TextField
                id="standard-required"
                select
                label="Length"
                className={classes.textField}
                value={length}
                onChange={this.handleChange('length')}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
                helperText="Select Length of Service"
                margin="normal"
              >
                {time.map(l => (
                  <MenuItem key={l.key} value={l.text}>
                    {l.text}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="standard-required"
                label="Description"
                className={classes.textField}
                value={description}
                onChange={this.handleChange('description')}
                margin="normal"
              />
            </form>
            <Button id='cancelButton' onClick={() => this.handleClose()}>Cancel</Button>
            <Button id='bookButton' onClick={() => this.handleSubmit()}>save</Button>
          </div>
        </Modal>
      </div>
    );
  }
}

CreateService.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(CreateService);

export default connect()(SimpleModalWrapped);