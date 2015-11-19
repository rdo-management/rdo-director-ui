import * as _ from 'lodash';
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
import NotificationsToaster   from './notifications/NotificationsToaster';

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
      console.log(response);
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
      'nav nav-tabs nav-tabs-pf drawer-nav' : true,
      'drawer-collapsed' : !this.state.isOpen
    });

    let toggleClasses = ClassNames({
      'drawer-toggle' : true,
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

    let toasterNotification = _.findLast(_.filter(this.state.notifications, function(notification) {
      return !notification.viewed &&
             notification.type !== 'success' &&
             notification.type !== 'ok';
    }));

    return (
      <div>
        <NotificationsToaster notification={toasterNotification}/>
        <div className="navbar-fixed-bottom wrapper-footer container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <ul className={indicatorsClasses}>
                <li className={notificationTabClasses}>
                  <a onClick={this.showNotifications.bind(this)}>
                    <span>Notifications</span>
                  </a>
                </li>
                <li className={validationTabClasses}>
                  <a onClick={this.showValidations.bind(this)}>
                    <span>Validations</span>
                  </a>
                </li>
                <li className={this.state.isOpen ? 'hidden' : ''}>
                  <NotificationsIndicator notifications={this.state.notifications}
                                          onClick={this.showNotifications.bind(this)}/>
                </li>
                <li className={this.state.isOpen ? 'hidden' : ''}>
                  <ValidationsIndicator validationStages={this.state.validationStages}
                                        onClick={this.showValidations.bind(this)}/>
                </li>
              </ul>
              <span className={toggleClasses} onClick={this.toggleOpen.bind(this)}></span>
            </div>
          </div>
          <div className={contentClasses}>
            <NotificationList active={this.state.listShown === 'notifications'}
                              notifications={this.state.notifications}/>
            <ValidationsList  active={this.state.listShown === 'validations'}
                              validationStages={this.state.validationStages}/>
          </div>
        </div>
      </div>
    );
  }
}
