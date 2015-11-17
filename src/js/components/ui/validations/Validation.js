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

    let runButtonClass = ClassNames({
      'btn': true,
      'btn-primary' : true,
      'run-button' : true,
      'available' : this.props.validation.status == 'new'
    });

    let stopButtonClass = ClassNames({
      'btn': true,
      'btn-danger' : true,
      'stop-button' : true,
      'available' : this.props.validation.status === 'running'
    });

    let detailsClass = ClassNames({
      'details-link' : true,
      'available' : this.props.validation.results && this.props.validation.results.length > 0
    });

    return (
        <div className="col-lg-4 col-md-6 col-sm-12">
          <div className="card-pf validation">
            <div>
              <span className={statusIconClass}>
                <span className="validation-name">{this.props.validation.name}</span>
              </span>
              <button className={runButtonClass} onClick={this.runValidaton.bind(this)}>
                Run Now
              </button>
              <button className={stopButtonClass} onClick={this.stopValidation.bind(this)}>
                Stop
              </button>
            </div>
            <div>
              <span className="validation-message">{this.props.validation.description}</span>
              <a href="#" className={detailsClass} onClick={this.viewDetails.bind(this)}>
                View Details
              </a>
            </div>
          </div>
        </div>
    );
  }
}

Validation.propTypes = {
  validation: React.PropTypes.object
};
