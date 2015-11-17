import React from 'react';
import ClassNames from 'classnames';

export default class Validation extends React.Component {
  constructor() {
    super();
  }

  toggleOpen () {
    var nowOpen = !this.state.isOpen;
    this.setState({isOpen: nowOpen});
  }

  runValidaton () {
    // TODO: Run the validation
  }

  stopValidation () {
    // TODO: Stop the validation
  }

  viewDetails () {
    // TODO: Show the details
  }

  render() {
    let status = this.props.validation.status;
    let statusIconClass = ClassNames({
      'validation-icon' : true,
      'pficon pficon-error-circle-o': status === 'failed',
      'pficon pficon-ok':             status === 'ok',
      'pficon pficon-running':        status === 'running',
      'pficon pficon-add-circle-o':   status === 'new'
    });

    var runButton;
    if (this.props.validation.status == 'new')
    {
      runButton =
        <button className="btn btn-primary btn-xs pull-right"
                onClick={this.runValidaton.bind(this)}>
          Run Now
        </button>;
    }

    var stopButton;
    if (this.props.validation.status == 'running')
    {
      stopButton =
        <button className="btn btn-danger btn-xs pull-right"
                onClick={this.stopValidation.bind(this)}>
          Stop
        </button>;
    }

    var detailsLink;
    if (this.props.validation.results && this.props.validation.results.length > 0)
    {
      detailsLink =
        <a className="details-link" onClick={this.viewDetails.bind(this)}>
          View Details
        </a>
    }

    return (
        <div className="col-lg-4 col-md-6 col-sm-12">
          <div className="card-pf validation">
            <div>
              <span className={statusIconClass}>
                <span className="validation-name">{this.props.validation.name}</span>
              </span>
              {runButton}
              {stopButton}
            </div>
            <div>
              <span className="validation-message">{this.props.validation.description}</span>
              {detailsLink}
            </div>
          </div>
        </div>
    );
  }
}

Validation.propTypes = {
  validation: React.PropTypes.object
};
