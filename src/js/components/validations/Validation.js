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

    return (
        <div className="validation">
          <div className="validation-icon-container">
            <span className={statusIconClass}></span>
          </div>
          <div className="validation-info-container">
            <div className="validation-name">{this.props.name}</div>
            <div>
              <div className="validation-message">{this.props.description}</div>
              <a className="link" onClick={this.viewDetails.bind(this)}>View Details</a>
            </div>
          </div>
          <div className="validation-action-button-container">
            {this.getActionButton()}
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
