import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import React from 'react';
import ClassNames from 'classnames';

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
      validationStages: ValidationsStore.getState().stages
    };

    this.validationsChangeListener = this._onValidationsChange.bind(this);
  }

  componentDidMount() {
    ValidationsStore.addChangeListener(this.validationsChangeListener);
    this.getValidationStages();
  }

  componentWillUnmount() {
    ValidationsStore.removeChangeListener(this.validationsChangeListener);
  }

  getValidationStages() {
    ValidationsApiService.getStages().then((response) => {
      ValidationsActions.listStages(response);
    }).catch((error) => {
      console.error('Error in Footer.getValidationStages', error); //eslint-disable-line no-console
      let errorHandler = new ValidationsApiErrorHandler(error);
      errorHandler.errors.forEach((error) => {
        this.props.dispatch(NotificationActions.notify(error));
      });
    });
  }

  _onValidationsChange() {
    this.setState({validationStages: ValidationsStore.getState().stages});
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
      'drawer-content row' : true,
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
      <div className="wrapper-fixed-footer drawer-container container-fluid">
        <div className="row">
          <a className={toggleClasses} onClick={this.toggleOpen.bind(this)}></a>
          <ul className={indicatorsClasses}>
            <li className={notificationTabClasses}>
              <a className="link" onClick={this.showNotifications.bind(this)}>Notifications</a>
            </li>
            <li className={validationTabClasses}>
              <a className="link" onClick={this.showValidations.bind(this)}>Validations</a>
            </li>
            <li className={this.state.isOpen ? 'hidden' : ''}>
              <NotificationsIndicator notifications={this.props.notifications}
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
                            notifications={this.props.notifications}
                            notificationsViewed={this.props.notificationsViewed}
                            removeNotification={this.props.removeNotification}/>
          <ValidationsList  active={this.state.isOpen && this.state.listShown === 'validations'}
                            validationStages={this.state.validationStages}/>
        </div>
      </div>
    );
  }
}
Footer.propTypes = {
  dispatch: React.PropTypes.func,
  notifications: ImmutablePropTypes.map.isRequired,
  notificationsViewed: React.PropTypes.func.isRequired,
  removeNotification: React.PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    notificationsViewed: () => {
      dispatch(NotificationActions.notificationsViewed());
    },
    removeNotification: id => {
      dispatch(NotificationActions.removeNotification(id));
    }
  };
}

function mapStateToProps(state) {
  return {
    notifications: state.notifications.get('all').sortBy(n => n.timestamp)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
