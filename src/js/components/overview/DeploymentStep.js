import React from 'react';

export default class DeploymentStep extends React.Component {

  render() {
    var links = false;
    if (this.props.links && this.props.links.length > 0) {
      links = this.props.links.map((link, index) => {
        return (
          <div  key={index} className="deployment-step-link">
            {link}
          </div>
        );
      });
    }

    return (
      <div className="deployment-step">
        <h2>
          <strong>{this.props.stepNumber}</strong>
          <span className="deployment-title">{this.props.title}</span>
        </h2>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div>
                <span className="pull-left">{this.props.subTitle}</span>
                {links}
              </div>
            </div>
            <div className="col-sm-12">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
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
