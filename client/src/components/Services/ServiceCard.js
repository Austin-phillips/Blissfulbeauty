import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import auth0Client from '../../Auth';
import ServiceModal from './ServiceModal';
import UpdateService from './UpdateService';
import Grid from '@material-ui/core/Grid';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { ROLE_URL } from '../../Secrets/env';
import { getServices } from '../../actions/services';
import { getAppointments } from '../../actions/appointments';
import './Service.css';

const styles = {
  card: {
    maxWidth: '100%',
    margin: '20px auto',
  },
  media: {
    height: 140,
  },
};

class ServiceCard extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

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
        <div key={service.id}>
          <ServiceModal service={service} />
          <UpdateService service={service} />
        </div>
      )
    } else {
      return (
        <div key={service.id}>
          <ServiceModal service={service} />
        </div>
      )
    }

  };

  signIn = () => {
    const { cookies, location } = this.props;
    const pathname = location;
    cookies.set('pathname', `${pathname}`, { path: '/'})
    auth0Client.signIn()
  }

  serviceCard = () => {
    const { classes, user, services } = this.props;
    return services.map(s => {
      return(
        <Grid key={s.id} item xs={12} sm={6}>
          <Card id='ServiceCard' key={s.id} className={classes.card}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {s.name}
            </Typography>
            {s.description === '' ? null :
                <Typography component="p">
                  {s.description}
                </Typography>
            }
              <Typography component="p">
                Price: ${s.price}.00
            </Typography>
              <Typography component="p">
                length: {s.length} min
            </Typography>
            </CardContent>
            <CardActions id="bookButtonContainer">
              { user.isAuthenticated ? 
                this.handleButtons(s) : 
                <Button id='bookButton' onClick={() => this.signIn()}>Sign In to Book</Button>
              }
            </CardActions>
          </Card>
        </Grid>
      )
    });
  };
  
  render() {
    return(
      <div>
        <Grid container spacing={24}>
          {this.serviceCard()}
        </Grid>
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

export default withCookies(connect(mapStateToProps)(withStyles(styles)(ServiceCard)));