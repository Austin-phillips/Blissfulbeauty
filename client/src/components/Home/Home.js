import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { Button, Icon } from 'react-materialize';
import auth0Client from '../../Auth';
import { helloWorld } from '../../Secrets/env';

class Home extends Component {

  render() {
    return(
      <div>
        <Header>{helloWorld}</Header>
      </div>
    )
  }
};

export default withRouter(Home);