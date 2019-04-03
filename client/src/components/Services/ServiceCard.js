import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import auth0Client from '../../Auth';
import ServiceModal from './ServiceModal';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { ROLE_URL } from '../../Secrets/env';
import { getServices } from '../../actions/services';
import { getAppointments } from '../../actions/appointments';
import './Service.css';
import UpdateService from './UpdateService';

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

  handleButtons = (service) => {
    const { user } = this.props;
    const profile = user.profile
    const role = profile[ROLE_URL]

    if (role[0] === 'admin') {
      return (
        <div>
          <ServiceModal service={service} />
          <UpdateService service={service} />
        </div>
      )
    } else {
      return (
        <div>
          <ServiceModal service={service} />
        </div>
      )
    }

  };

  serviceCard = () => {
    const { classes, user, services } = this.props;
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
            { user.isAuthenticated ? 
              this.handleButtons(s) : 
              <Button onClick={() => auth0Client.signIn()}>Sign In to Book</Button>
            }
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
  return { services: state.services, user: state.user}
}

export default connect(mapStateToProps)(withStyles(styles)(ServiceCard));