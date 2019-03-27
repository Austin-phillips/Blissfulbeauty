import React, { Component } from 'react';

class UpdateService extends Component {

  render() {
    return(
      <div>
        <h1>This is the update page for id {this.props.match.params.id}</h1>
      </div>
    )
  }
}

export default UpdateService;