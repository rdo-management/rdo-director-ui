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

  render() {
    let indicatorsClasses = ClassNames({
      'drawer-nav' : true,
      'drawer-collapsed' : !this.state.isOpen
    });

    let toggleClasses = ClassNames({
      'drawer-toggle link' : true,
      'collapsed': !this.state.isOpen
    });

    let contentClasses = ClassNames({
      'drawer-content' : true,
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

    return (
      <div className="wrapper-fixed-footer drawer-container">
        <div>
          <a className={toggleClasses} onClick={this.toggleOpen.bind(this)}></a>
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
