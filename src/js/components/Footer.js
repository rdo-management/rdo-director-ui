import React from 'react';
import ClassNames from 'classnames';

import NotificationStore from '../stores/NotificationStore';
import NotificationActions from '../actions/NotificationActions';
import ValidationsActions from '../actions/ValidationsActions';
import ValidationsApiService from '../services/ValidationsApiService';
import ValidationsApiErrorHandler from '../services/ValidationsApiErrorHandler';
import ValidationsStore from '../stores/ValidationsStore';

import NotificationsIndicator from './notifications/NotificationsIndicator';
import NotificationList       from './notifications/NotificationList';

import ValidationsIndicator from './validations/ValidationsIndicator';
import ValidationsList from './validations/ValidationsList';

import MockValidations from '../mock/mockValidations';

export default class Footer extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      listShown: 'notifications',
      notifications: NotificationStore.getState(),
      validationStages: ValidationsStore.getState().stages
    };

    this.validationsChangeListener = this._onValidationsChange.bind(this);
    this.notificationsChangeListener = this._onNotificationsChange.bind(this);
  }

  componentDidMount() {
    NotificationStore.addChangeListener(this.notificationsChangeListener);
    ValidationsStore.addChangeListener(this.validationsChangeListener);
    this.getValidationStages();
  }

  componentWillUnmount() {
    ValidationsStore.removeChangeListener(this.validationsChangeListener);
    NotificationStore.removeChangeListener(this.notificationsChangeListener);
  }

  getValidationStages() {
    ValidationsApiService.getStages().then((response) => {
      ValidationsActions.listStages(response);
    }).catch((error) => {
      console.error('Error in Footer.getValidationStages', error);
      let errorHandler = new ValidationsApiErrorHandler(error);
      errorHandler.errors.forEach((error) => {
        NotificationActions.notify(error);
      });
    });
  }

  _onValidationsChange() {
    this.setState({validationStages: ValidationsStore.getState().stages});
  }

  _onNotificationsChange() {
    this.setState({notifications: NotificationStore.getState()});
  }

  toggleOpen(e) {
    e.preventDefault();
    this.setState({isOpen: !this.state.isOpen});
  }

  showNotifications(e) {
    e.preventDefault();
    this.setState({isOpen: true, listShown: 'notifications'});
  }

  showValidations(e) {
    e.preventDefault();
    this.setState({isOpen: true, listShown: 'validations'});
  }

  fakeNotification (e) {
    if (this.fakeCount === undefined) {
      this.fakeCount = 0;
    }

    let msgType = this.fakeCount % 4;
    this.fakeCount++;
    if (msgType === 0) {
      NotificationActions.notify({
        title: 'Bah!',
        message: 'Something has gone awry!',
        type: 'error'
      });
    }
    else if (msgType === 1) {
      NotificationActions.notify({
        title: 'Oopsies!',
        message: 'It looks like something could be an issue.',
        type: 'warning'
      });
    }
    else if (msgType === 2) {
      NotificationActions.notify({
        title: 'Yay!',
        message: 'Everything went completely as planned.',
        type: 'success'
      });
    }
    else if (msgType === 3) {
      NotificationActions.notify({
        title: 'Hey!',
        message: 'You might want to check out how things went.',
        type: 'info'
      });
    }
  }

  fakeValidations () {
    if (this.state.validationStages && this.state.validationStages.length > 0) {
      this.setState({validationStages: []});
    }
    else {
      this.setState({validationStages: MockValidations.validations});
    }
  }

  render() {
    let drawerHeaderClasses = ClassNames({
      'row drawer-header' : true,
      'content-open' : this.state.isOpen

    });
    let indicatorsClasses = ClassNames({
      'nav navbar-nav drawer-nav' : true,
      'drawer-collapsed' : !this.state.isOpen
    });

    let toggleClasses = ClassNames({
      'drawer-toggle link' : true,
      'collapsed': !this.state.isOpen
    });

    let contentClasses = ClassNames({
      'row drawer-content' : true,
      'collapsed': !this.state.isOpen
    });

    let notificationTabClasses =  ClassNames({
      hidden: !this.state.isOpen,
      active: this.state.listShown === 'notifications'
    });
    let validationTabClasses =  ClassNames({
      hidden: !this.state.isOpen,
      active: this.state.listShown === 'validations'
    });

    let fakeStyle = {
      color: 'transparent'
    };
    let fakeStyle2 = {
      color: 'transparent',
      float: 'right'
    };

    return (
      <div className="navbar-fixed-bottom wrapper-footer container-fluid">
        <div className={drawerHeaderClasses}>
          <ul className={indicatorsClasses}>
            <li className={notificationTabClasses}>
              <a className="link" onClick={this.showNotifications.bind(this)}>Notifications</a>
            </li>
            <li className={validationTabClasses}>
              <a className="link" onClick={this.showValidations.bind(this)}>Validations</a>
            </li>
            <li className={this.state.isOpen ? 'hidden' : ''}>
              <NotificationsIndicator notifications={this.state.notifications}
                                      onClick={this.showNotifications.bind(this)}/>
            </li>
            <li className={(this.state.isOpen ? 'hidden' : '') + ' separator'}></li>
            <li className={this.state.isOpen ? 'hidden' : ''}>
              <ValidationsIndicator validationStages={this.state.validationStages}
                                    onClick={this.showValidations.bind(this)}/>
            </li>
          </ul>
          <span onClick={this.fakeNotification.bind(this)} style={fakeStyle}>Fake Notification</span>
          <span onClick={this.fakeValidations.bind(this)} style={fakeStyle2}>Fake Validations</span>
          <a className={toggleClasses} onClick={this.toggleOpen.bind(this)}></a>
        </div>
        <div className={contentClasses}>
          <NotificationList active={this.state.isOpen && this.state.listShown === 'notifications'}
                            notifications={this.state.notifications}/>
          <ValidationsList  active={this.state.isOpen && this.state.listShown === 'validations'}
                            validationStages={this.state.validationStages}/>
        </div>
      </div>
    );
  }
}
