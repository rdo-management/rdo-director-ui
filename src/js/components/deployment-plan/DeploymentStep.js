import React from 'react';

export default class DeploymentStep extends React.Component {

  render() {
    return (
      <li className="deployment-step">
        <h3>
          <span className="deployment-step-title">{this.props.title}</span>
        </h3>
        <div className="container-fluid deployment-step-content">
          <div className="row">
            <div className="col-sm-12">
              <div>
                <span className="deployment-step-subtitle">{this.props.subTitle}</span>
                {this.props.links}
              </div>
            </div>
            <div className="col-sm-12">
              {this.props.children}
            </div>
          </div>
        </div>
      </li>
    );
  }
}

DeploymentStep.propTypes = {
  children: React.PropTypes.node,
  links: React.PropTypes.array,
  stepNumber: React.PropTypes.number.isRequired,
  subTitle: React.PropTypes.string,
  title: React.PropTypes.string.isRequired
};
