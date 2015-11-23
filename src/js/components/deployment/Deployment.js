import React from 'react';

export default class Deployment extends React.Component {
  constructor() {
    super();
    this.state = {
      deploymentState: ''
    };
  }

  validateDeployment() {
    console.log('Here be the validation');
  }

  render() {
    return (
      <div>
        <h2>Deployment</h2>
        <button className="btn btn-lg btn-default" onCLick={this.validateDeployment()}>Validate Deployment</button>
        <button className="btn btn-lg btn-primary">Deploy</button>
      </div>
    );
  }
}
Deployment.propTypes = {
  currentPlanName: React.PropTypes.string
};
