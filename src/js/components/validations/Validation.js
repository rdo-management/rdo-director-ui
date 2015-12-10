import * as _ from 'lodash';
import ClassNames from 'classnames';
import React from 'react';

import NotificationActions from '../../actions/NotificationActions';
import ValidationsApiService from '../../services/ValidationsApiService';
import ValidationsApiErrorHandler from '../../services/ValidationsApiErrorHandler';

export default class Validation extends React.Component {
  runValidaton () {
    ValidationsApiService.runValidation(this.props.uuid).then((response) => {
      console.log(response); //eslint-disable-line no-console
    }).catch((error) => {
      console.error('Error in Validation.runValidaton', error); //eslint-disable-line no-console
      let errorHandler = new ValidationsApiErrorHandler(error);
      errorHandler.errors.forEach((error) => {
        NotificationActions.notify(error);
      });
    });
  }

  stopValidation () {
    ValidationsApiService.stopValidation(this.props.uuid).then((response) => {
      console.log(response); //eslint-disable-line no-console
    }).catch((error) => {
      console.error('Error in Validation.runValidaton', error); //eslint-disable-line no-console
      let errorHandler = new ValidationsApiErrorHandler(error);
      errorHandler.errors.forEach((error) => {
        NotificationActions.notify(error);
      });
    });
  }

  viewDetails (e) {
    e.preventDefault();
    // TODO: Show the details
  }

  getActionButton() {
    if (_.includes(['new', 'success', 'failed'], this.props.status)) {
      return (
        <button className="btn btn-primary btn-xs pull-right"
                onClick={this.runValidaton.bind(this)}>
          Run Now
        </button>
      );
    } else if (this.props.status === 'running' ) {
      return (
        <button className="btn btn-danger btn-xs pull-right"
                onClick={this.stopValidation.bind(this)}>
          Stop
        </button>
      );
    } else {
      return false;
    }
  }

  render() {
    let status = this.props.status;
    let statusIconClass = ClassNames({
      'validation-icon' : true,
      'pficon pficon-error-circle-o': status === 'failed',
      'pficon pficon-ok':             status === 'success',
      'pficon pficon-running':        status === 'running',
      'pficon pficon-flag':           status === 'new'
    });

    let messageClass = ClassNames({
      'validation-message' : true,
      'no-message' : !this.props.description
    });
    // Make sure there is text when there is no description so vertical spacing remains consistent
    let message = this.props.description || 'Not Available';

    return (
      <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 validation">
        <div className="validation-content">
          <span className={statusIconClass}></span>
          <div className="validation-info-container">
              <span>{this.props.name}</span>
              <span className={messageClass}>{message}</span>
              <a className="link details-link" onClick={this.viewDetails.bind(this)}>
                View Details
              </a>
          </div>
          <div className="validation-action-button-container">
            {this.getActionButton()}
          </div>
        </div>
      </div>
    );
  }
}

Validation.propTypes = {
  description: React.PropTypes.string,
  name: React.PropTypes.string,
  status: React.PropTypes.string,
  uuid: React.PropTypes.string
};
