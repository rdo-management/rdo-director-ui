import * as _ from 'lodash';
import React from 'react';
import ClassNames from 'classnames';

import NotificationActions from '../../actions/NotificationActions';
import Validation from './Validation';
import ValidationsApiService from '../../services/ValidationsApiService';
import ValidationsApiErrorHandler from '../../services/ValidationsApiErrorHandler';


export default class ValidationStage extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: false
    };
  }

  toggleOpen (e) {
    e.preventDefault();
    var nowOpen = !this.state.isOpen;
    this.setState({isOpen: nowOpen});
  }

  runStage () {
    ValidationsApiService.runStage(this.props.uuid).then((response) => {
      console.log(response); //eslint-disable-line no-console
    }).catch((error) => {
      console.error('Error in ValidationStage.runStage', error); //eslint-disable-line no-console
      let errorHandler = new ValidationsApiErrorHandler(error);
      errorHandler.errors.forEach((error) => {
        NotificationActions.notify(error);
      });
    });
  }

  getStatusBadge (title, badgeStyle, count) {
    let badge = false;
    if (count > 0) {
      badge = (
        <div className="status-container">
          <span className="badge-title">{title}</span>
          <span className={'badge ' + badgeStyle}>{count}</span>
        </div>
      );
    }
    return badge;
  }

  getStatusBadges () {
    let statusInfo = _.countBy(_.pluck(this.props.validations, 'status'));
    statusInfo.running = statusInfo.running || 0;
    statusInfo.available = (statusInfo.available || 0) + (statusInfo.new || 0);
    statusInfo.success = (statusInfo.success || 0) + (statusInfo.ok || 0);
    statusInfo.error = (statusInfo.error || 0) + (statusInfo.failed || 0);

    return (
      <div>
        {this.getStatusBadge('Running', 'running',   statusInfo.running)}
        {this.getStatusBadge('New',     'available', statusInfo.available)}
        {this.getStatusBadge('Success', 'success',   statusInfo.success)}
        {this.getStatusBadge('Errors',  'error',     statusInfo.error)}
      </div>
    );
  }

  render() {
    let titleClass = ClassNames({
      link: true,
      collapsed: !this.state.isOpen
    });

    let contentClass = ClassNames({
      'panel-collapse collapse' : true,
      'in' : this.state.isOpen
    });

    let validations = this.props.validations.map((validation, index) => {
      return (
        <Validation key={index}
                    name={validation.name}
                    status={validation.status}
                    description={validation.description}
                    uuid={validation.uuid} />
      );
    });

    return (
        <div className="panel panel-default">
          <div className="panel-heading validation-stage-panel-heading">
            <div className="row">
              <div className="col-md-2 col-xs-3">
                <h4 className="panel-title">
                  <a onClick={this.toggleOpen.bind(this)} className={titleClass}>
                    {this.props.name}
                  </a>
                </h4>
              </div>
              <div className="col-md-9 col-sm-8 col-xs-7">
                {this.getStatusBadges()}
              </div>
              <div className="col-sm-1 col-xs-2">
                <button className="btn btn-primary pull-right" onClick={this.runStage.bind(this)}>
                  Run All
                </button>
              </div>
            </div>
          </div>
          <div className={contentClass}>
            <div className="container-fluid">
              <div className="row validations-container">
                {validations}
              </div>
            </div>
          </div>
        </div>
    );
  }
}

ValidationStage.propTypes = {
  name: React.PropTypes.string,
  uuid: React.PropTypes.string,
  validations: React.PropTypes.array
};
