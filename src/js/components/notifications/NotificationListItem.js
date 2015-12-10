import React from 'react';
import ClassNames from 'classnames';
import {FormattedDate} from 'react-intl';


export default class NotificationListItem extends React.Component {
  render() {
    let classes = ClassNames({
      'alert': true,
      'unviewed': !this.props.viewed,
      'alert-danger': this.props.type === 'error' || !this.props.type,
      'alert-warning': this.props.type === 'warning',
      'alert-success': this.props.type === 'success',
      'alert-info': this.props.type === 'info'
    });
    let iconClass = ClassNames({
      'pficon': true,
      'pficon-ok': this.props.type === 'success',
      'pficon-info': this.props.type === 'info',
      'pficon-warning-triangle-o': this.props.type === 'warning',
      'pficon-error-circle-o': this.props.type === 'error' || !this.props.type
    });

    let notificationDate = new Date();
    notificationDate.setTime(this.props.timestamp);

    return (
      <div className={classes} role="alert">
        <span className={iconClass} aria-hidden="true"></span>
        <span>
          <strong>{this.props.title}</strong> {this.props.message}
        </span>
        <div className="pull-right">
          <div className="notification-time">
            <FormattedDate className="notification-time" value={notificationDate}
                           month="numeric" day="numeric" year="numeric"
                           hour="numeric" minute="numeric" second="numeric" />
          </div>
          <button type="button"
                  className="btn btn-primary btn-xs pull-right"
                  onClick={this.props.removeNotification}>
            Dismiss
          </button>
        </div>
      </div>
    );
  }
}
NotificationListItem.propTypes = {
  message: React.PropTypes.string.isRequired,
  removeNotification: React.PropTypes.func,
  timestamp: React.PropTypes.number,
  title: React.PropTypes.string,
  type: React.PropTypes.string,
  viewed: React.PropTypes.bool
};
NotificationListItem.defaultProps = {
  dismissable: true,
  title: '',
  type: 'error'
};
