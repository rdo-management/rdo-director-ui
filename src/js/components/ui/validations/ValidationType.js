import React from 'react';
import ClassNames from 'classnames';

import Validation from './Validation';
import ValidationsStore from '../../../stores/ValidationsStore';

export default class ValidationType extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      availableCount: 0,
      runningCount: 0,
      sucessCount: 0,
      errorCount: 0,
      validationStatuses: [],
      details: []
    };
    this.changeListener = this._onChange.bind(this);
  }

  componentDidMount() {
    this._onChange();
    ValidationsStore.addChangeListener(this.changeListener);
  }

  componentWillUnmount() {
    ValidationsStore.removeChangeListener(this.changeListener);
  }

  _onChange() {
    let newState = {
      availableCount: 0,
      runningCount: 0,
      sucessCount: 0,
      errorCount: 0,
      validationStatuses: [],
      details: []
    };

    // TODO: Get updated validation type

    this.props.validationType.validations.forEach(function(validation, index) {
      if (validation.status === 'failed') {
        newState.errorCount++;
      }
      else if (validation.status === 'ok') {
        newState.sucessCount++;
      }
      else if (validation.status === 'running') {
        newState.runningCount++;
      }
      else if (validation.status === 'new') {
        newState.availableCount++;
      }

      if (validation.details && validation.details.length > 0)
      {
        newState.details = newState.details.concat(validation.details);
      }
    });

    if (newState.availableCount > 0) {
      newState.validationStatuses.push(
        {
          count: newState.availableCount,
          label: 'New' + (newState.runningCount||newState.sucessCount||newState.errorCount ? ',':'')
        }
      );
    }
    if (newState.runningCount > 0) {
      newState.validationStatuses.push(
        {
          count: newState.runningCount,
          label: 'Running' + (newState.sucessCount||newState.errorCount ? ',':'')
        }
      );
    }
    if (newState.sucessCount > 0) {
      newState.validationStatuses.push(
        {
          count: newState.sucessCount,
          label: 'Succeeded' + (newState.errorCount ? ',':'')
        }
      );
    }
    if (newState.errorCount > 0) {
      newState.validationStatuses.push(
        {
          count: newState.errorCount,
          label: 'Failed'
        }
      );
    }

    this.setState(newState);
  }

  toggleOpen () {
    var nowOpen = !this.state.isOpen;
    this.setState({isOpen: nowOpen});
  }

  runAll () {
    // TODO: Run the validations
  }

  render() {
    let headingClass = ClassNames({
      'col-lg-3 col-sm-3': true,
      'heading': true,
      'collapsed': !this.state.isOpen
    });

    let contentClass = ClassNames({
      'row' : true,
      'validation-type-content' : true,
      'opened' : this.state.isOpen
    });

    let runButtonClass = ClassNames({
      'btn': true,
      'btn-primary' : true,
      'run-button' : true
    });

    let detailsClass = ClassNames({
      'details-link' : true,
      'available' : this.state.details && this.state.details.length > 0
    });

    let validationStatuses = this.state.validationStatuses.map((status, index) => {
      return (
        <li key={index} className="validation-status">{status.count} {status.label}</li>
      );
    });

    let validations = this.props.validationType.validations.map((validation, index) => {
      return (
        <Validation key={index} validation={validation} />
      );
    });

    return (
      <div className="validation-type-panel">
        <div className="validation-type-title row">
          <a onClick={this.toggleOpen.bind(this)} className={headingClass}>
            {this.props.validationType.name}
          </a>
          <div className="col-lg-4 col-sm-5">
            <ul className="validation-statuses">
              {validationStatuses}
            </ul>
            <a className={detailsClass}>View Details</a>
          </div>
          <button className={runButtonClass} onClick={this.runAll.bind(this)}>
            Run All
          </button>
        </div>
        <div className={contentClass}>
          {validations}
        </div>
      </div>
    );
  }
}

ValidationType.propTypes = {
  validationType: React.PropTypes.object
};
