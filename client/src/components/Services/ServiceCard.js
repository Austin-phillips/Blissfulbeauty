import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { getServices, deleteService } from '../../actions/services';
import { getAppointments } from '../../actions/appointments';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './Service.css';
import auth0Client from '../../Auth';
import { ROLE_URL } from '../../Secrets/env';
import ServiceModal from './ServiceModal';

const styles = {
  card: {
    maxWidth: '80%',
    margin: '20px auto',
  },
  media: {
    height: 140,
  },
};

class ServiceCard extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getServices())
    dispatch(getAppointments())
    
  };

  deleteService = (id) => {
    const deleted = window.confirm('Are you sure you want to delete?')
    if (deleted)
      this.props.dispatch(deleteService(id))
  }

  adminButtons = (id) => {
    const profile = auth0Client.getProfile()
    const role = profile[ROLE_URL]

    if (role[0] === 'admin') {
      return (
        <div>
          <Link to={`/services/${id}`}>
            <Button id='UpdateButton' size="small">
              Update Appointment
            </Button>
          </Link>
          <Button onClick={() => this.deleteService(id)} id='DeleteButton' size="small">
            Delete Appointment
          </Button>
        </div>
      )
    };

  };

  serviceCard = () => {
    const { classes } = this.props;
    const { services } = this.props;
    return services.map(s => {
      return(
        <Card id='ServiceCard' key={s.id} className={classes.card}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {s.name}
            </Typography>
              <Typography component="p">
                {s.description}
            </Typography>
              <Typography component="p">
                Price: ${s.price}.00
            </Typography>
              <Typography component="p">
                length: {s.length} min
            </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <ServiceModal service={s} />
            {auth0Client.isAuthenticated() ? this.adminButtons(s.id) : null}
          </CardActions>
        </Card>
      )
    });
  };
  
  render() {
    return(
      <div>
        {this.serviceCard()}
      </div>
    )
  }

}

ServiceCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return { services: state.services}
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(ServiceCard)));