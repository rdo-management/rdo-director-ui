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

  /**
  * Generates a string of capitalized statuses with count
  */
  getStatusInfo() {
    // Generate an object of status counts {'status': statusCount...}
    let stateCounts = _.countBy(_.pluck(this.props.validations, 'status'));
    // Capitalize keys
    let capitalizedStateCounts = _.mapKeys(stateCounts, (value, key) => {
      return _.capitalize(key);
    });
    // Transform status counts object to array of pairs, convert to string
    return _.map(_.pairs(capitalizedStateCounts), (pair) => {
      return pair.reverse().join(' ');
    }).join(', ');
  }

  toggleOpen (e) {
    e.preventDefault();
    var nowOpen = !this.state.isOpen;
    this.setState({isOpen: nowOpen});
  }

  runStage () {
    ValidationsApiService.runStage(this.props.uuid).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.error('Error in ValidationStage.runStage', error);
      let errorHandler = new ValidationsApiErrorHandler(error);
      errorHandler.errors.forEach((error) => {
        NotificationActions.notify(error);
      });
    });
  }

  render() {
    let titleClass = ClassNames({
      'validation-stage-title': true,
      'collapsed': !this.state.isOpen
    });

    let contentClass = ClassNames({
      'panel-body' : true,
      'validation-stage-content' : true,
      'opened' : this.state.isOpen
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
          <div className="panel-heading validation-stage-heading">
            <div className="row">
              <div className="col-lg-3 col-md-4 col-sm-5 col-xs-5">
                <h4 className="panel-title">
                  <a onClick={this.toggleOpen.bind(this)} className={titleClass}>
                    {this.props.name}
                  </a>
                </h4>
              </div>
              <div className="col-lg-3 col-md-4 col-sm-5 col-xs-5">
                <h4 className="panel-title">
                  {this.getStatusInfo()}
                </h4>
              </div>
              <button className="btn btn-primary btn-xs" onClick={this.runStage.bind(this)}>
                Run All
              </button>
            </div>
          </div>
          <div className={contentClass}>
            <div className="panel-body">
              {validations}
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
