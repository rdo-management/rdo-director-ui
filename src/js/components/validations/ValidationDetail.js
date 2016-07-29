import { includes } from 'lodash';
import ClassNames from 'classnames';
import React from 'react';

import Loader from '../ui/Loader';
import Modal from '../ui/Modal';

export default class ValidationDetail extends React.Component {
  renderValidationStatus(status) {
    const statusIconClass = ClassNames({
      'validation-icon' : true,
      'pficon pficon-error-circle-o': includes(['error', 'failed'], status),
      'pficon pficon-ok':             status === 'success',
      'pficon pficon-flag':           status === 'new'
    });
    return (
      <Loader loaded={status != 'running'}
              className="validation-icon"
              size="sm"
              component="span"
              inline>
        <span className={statusIconClass}></span>
      </Loader>
    );
  }

  render() {
    return (
      <Modal dialogClasses="modal-md">
        <div className="modal-header">
          <button type="button"
                  className="close"
                  aria-label="Close"
                  onClick={this.props.hideValidationDetail}>
            <span aria-hidden="true" className="pficon pficon-close"/>
          </button>
          <h4 className="modal-title">
            {this.props.name}
          </h4>
        </div>
        <div className="modal-body">
          <p>{this.props.description}</p>
          <p>Status: {this.renderValidationStatus(this.props.status)} {this.props.status}</p>
          <p>Failures: {this.props.resultDescription}</p>
        </div>
        <div className="modal-footer">
          <button type="button"
                  className="btn btn-default"
                  aria-label="Close"
                  onClick={this.props.hideValidationDetail}>
            Close
          </button>
        </div>
      </Modal>
    );
  }
}

ValidationDetail.propTypes = {
  description: React.PropTypes.string,
  hideValidationDetail: React.PropTypes.func,
  name: React.PropTypes.string.isRequired,
  resultDescription: React.PropTypes.string.isRequired,
  status: React.PropTypes.string.isRequired
};
