import ClassNames from 'classnames';
import React from 'react';

import NotificationActions from '../actions/NotificationActions';
import NotificationStore from '../stores/NotificationStore';

export default class NotificationList extends React.Component {
  constructor() {
    super();
    this.state = { notifications: [] };
    this.changeListener = this._onChange.bind(this);
  }

  componentDidMount() {
    this._onChange();
    NotificationStore.addChangeListener(this.changeListener);
  }

  componentWillUnmount() {
    NotificationStore.removeChangeListener(this.changeListener);
  }

  _onChange() {
    this.setState({ notifications: NotificationStore.getState() });
  }

  _removeNotification(index) {
    NotificationActions.removeNotification(index);
  }

  render() {
    let notifications = this.state.notifications.map((notification, index) => {
      return (
        <Notification key={index}
                      title={notification.title}
                      message={notification.message}
                      type={notification.type}
                      removeNotification={this._removeNotification.bind(this, index)}
                      dismissable={notification.dismissable}/>
      );
    });

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-3 col-lg-offset-9 col-md-4 col-md-offset-8 col-sm-6 col-sm-offset-6">
            <div className="notification-list">
              {notifications}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export class Notification extends React.Component {
  render() {
    let classes = ClassNames({
      'alert': true,
      'alert-danger': this.props.type === 'error',
      'alert-warning': this.props.type === 'warning',
      'alert-success': this.props.type === 'success',
      'alert-info': this.props.type === 'info',
      'alert-dismissable': this.props.dismissable
    });
    return (
      <div className={classes} role="alert">
        <button type="button" className="close" aria-label="Close" onClick={this.props.removeNotification}>
          <span aria-hidden="true">&times;</span>
        </button>
        <strong>{this.props.title}</strong><br/>
        {this.props.message}
      </div>
    );
  }
}
Notification.propTypes = {
  dismissable: React.PropTypes.bool,
  message: React.PropTypes.string.isRequired,
  removeNotification: React.PropTypes.func,
  title: React.PropTypes.string,
  type: React.PropTypes.string
};
Notification.defaultProps = {
  dismissable: true,
  title: '',
  type: 'error'
};
