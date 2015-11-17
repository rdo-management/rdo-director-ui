import React from 'react';
import ClassNames from 'classnames';
import ValidationsApiService from '../../../services/ValidationsApiService';
import ValidationsStore from '../../../stores/ValidationsStore';

import MockValidations from '../../../mock/mockValidations';
var mockValidations = true;

export default class ValidationsIndicator extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showValidations: false,
      validationTypes: []
    };

    this.changeListener = this._onChange.bind(this);
  }

  componentDidMount() {
    this._onChange();

    ValidationsApiService.handleGetValidations();
    ValidationsStore.addChangeListener(this.changeListener);
  }

  componentWillUnmount() {
    ValidationsStore.removeChangeListener(this.changeListener);
  }

  getValidationsList() {
    return document.getElementById('validationsList');
  }

  greaterStatus (status1, status2) {
    if (status1 === 'failed' || status2 === 'failed') {
      return 'failed';
    }
    else if (status1 === 'running' || status2 === 'running') {
      return 'running';
    }
    else if (status1 === 'new' || status2 === 'new'){
      return 'available';
    }
    else if (status1 === 'ok' || status2 === 'ok'){
      return 'ok';
    }
    else {
      return 'unknown';
    }
  }

  updateCurrentStatus(validationTypes) {
    let currentStatus = 'success';
    let statusCount = 0;
    let me = this;

    validationTypes.forEach(function(validationType, i) {
      validationType.validations.forEach(function (validation, j) {
        if (i + j === 0)
        {
          currentStatus = validation.status || 'failed';
          statusCount = 1;
        }
        else if (validation.status === currentStatus) {
          statusCount++;
        }
        else
        {
          var newStatus = me.greaterStatus(currentStatus, validation.status || 'failed');
          if (newStatus !== currentStatus)
          {
            currentStatus = newStatus;
            statusCount = 1;
          }
        }
      });
    });

    this.setState({currentStatus: currentStatus, statusCount: statusCount});
  }

  _onChange() {
    if (mockValidations) {
      this.updateCurrentStatus(MockValidations.validations);
      return;
    }

    this.updateCurrentStatus(ValidationsStore.getState().validations);
  }

  showValidationsList() {
    let list = this.getValidationsList();
    if (list) {
      if (!list.classList.contains('opened')) {
        list.classList.add('opened');
        list.classList.remove('closed');
      }
    }
  }

  hideValidationsList() {
    let list = this.getValidationsList();
    if (list) {
      if (list.classList.contains('opened')) {
        list.classList.remove('opened');
        list.classList.add('closed');
      }
    }
  }

  toggleValidationsList(e) {
    e.preventDefault();

    let list = this.getValidationsList();
    if (list) {
      if (list.classList.contains('opened')) {
        list.classList.remove('opened');
        list.classList.add('closed');
      }
      else {
        list.classList.add('opened');
        list.classList.remove('closed');
      }
    }
  }

  render() {
    let validationStatusIcon = ClassNames({
      'validations-icon' : true,
      'pficon pficon-error-circle-o':     this.state.currentStatus === 'failed',
      'pficon pficon-running':            this.state.currentStatus === 'running',
      'pficon pficon-add-circle-o':       this.state.currentStatus === 'new',
      'pficon pficon-ok':                 this.state.currentStatus === 'ok',
      'pficon pficon-warning-triangle-o': this.state.currentStatus === 'unknown'
    });


    return (
      <div className="pull-left">
        <a href="#" onClick={this.toggleValidationsList.bind(this)} className="indicator">
          <span className={validationStatusIcon}></span>
          Validations: <strong>{this.state.statusCount}</strong>
        </a>
      </div>
    );
  }
    /*
     [
     {
     uuid: 1,
     name: "Hardware Validations",
     description: "hardware validations description",
     stage: "Some Stage",
     status: 'running',
     validations: [
     {
     uuid: 1,
     name: "Unique MAC Address Check",
     description: "Currently Running... 86% Complete. 0 Errors so far.",
     type: "1",
     status: 'running',
     results: [],
     ansible_playbook: "",
     slow: false,
     isAvailable: false
     },
     {
     uuid: 2,
     name: "Hardware Accessibility Check",
     description: "Last Run: Nov 3, 2015 8:20:10 AM. 0 Errors",
     type: "1",
     status: 'success',
     results: [],
     ansible_playbook: "",
     slow: false,
     isAvailable: true
     }
     ]
     },
     {
     uuid: 2,
     name: "Network Configuration Validations",
     description: "network configuration validations description",
     stage: "Some Stage",
     status: 'failed',
     validations: [
     {
     uuid: 3,
     name: "Unique Subnet Check",
     description: "Last Run: Nov 3, 2015 8:20:10 AM. 3 Errors",
     type: "1",
     status: 'failed',
     results: [],
     ansible_playbook: "",
     slow: false,
     isAvailable: true
     },
     {
     uuid: 4,
     name: "Some Other Network Configuration Check",
     description: "Last Run: Nov 3, 2015 8:20:10 AM. 0 Errors",
     type: "1",
     status: 'success',
     results: [],
     ansible_playbook: "",
     slow: false,
     isAvailable: true
     }
     ]
     },
     {
     uuid: 3,
     name: "Validation Category Name 3",
     description: "Validation Category Name 3 validations description",
     stage: "Some Stage",
     status: 'new',
     validations: [
     {
     uuid: 5,
     name: "Some Check",
     description: "Last Run: Never.",
     type: "1",
     status: 'new',
     results: [],
     ansible_playbook: "",
     slow: false,
     isAvailable: true
     },
     {
     uuid: 6,
     name: "Some Other Check",
     description: "Last Run: Never.",
     type: "1",
     status: 'new',
     results: [],
     ansible_playbook: "",
     slow: false,
     isAvailable: true
     }
     ]
     },
     {
     uuid: 4,
     name: "Validation Category Name 4",
     description: "Validation Category Name 4 validations description",
     stage: "Some Stage",
     status: 'new',
     validations: [
     {
     uuid: 7,
     name: "Some Unique Check",
     description: "Last Run: never",
     type: "1",
     status: 'new',
     results: [],
     ansible_playbook: "",
     slow: false,
     isAvailable: true
     },
     {
     uuid: 8,
     name: "Very Long Check",
     description: "Last Run: never",
     type: "1",
     status: 'new',
     results: [],
     ansible_playbook: "",
     slow: true,
     isAvailable: true
     }
     ]
     }
     ]
     */
}
