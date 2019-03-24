import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { Button, Icon } from 'react-materialize';

class Home extends Component {
  render() {
    return(
      <div>
        <Header>Welcome Home</Header>
      </div>
    )
  }
};

export default withRouter(Home);