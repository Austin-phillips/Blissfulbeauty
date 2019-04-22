import React from 'react';
import ServiceCard from './ServiceCard';
import Typography from '@material-ui/core/Typography';
import './Service.css';
import { ROLE_URL } from '../../Secrets/env';
import { connect } from 'react-redux';
import CreateService from './CreateService';
import { Divider } from '@material-ui/core';

class Services extends React.Component {

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { user, location } = this.props;
    const profile = user.profile
    const role = user.isAuthenticated ? profile[ROLE_URL] : null
  
    return (
      <div id="servicesContainer">
        <Typography id="servicesHeader" align='center' variant="h4" gutterBottom>
          Services
        </Typography> 
        <Divider id="servicesDivider" />
        {user.isAuthenticated && role[0] === 'admin' ? <CreateService /> : null}
        <ServiceCard location={location.pathname} />
      </div>
    );
  }
  }

const mapStateToProps = (state) => {
  return { user: state.user }
}

export default connect(mapStateToProps)((Services));