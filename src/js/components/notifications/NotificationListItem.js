import React from 'react';
import ClassNames from 'classnames';
import moment from 'moment';

export default class Notification extends React.Component {

  render() {
    let classes = ClassNames({
      'alert': true,
      'unviewed': !this.props.viewed,
      'alert-danger': this.props.type === 'error',
      'alert-warning': this.props.type === 'warning',
      'alert-success': this.props.type === 'success',
      'alert-info': this.props.type === 'info'
    });
    let iconClass = ClassNames({
      'pficon': true,
      'pficon-ok': this.props.type === 'success',
      'pficon-info': this.props.type === 'info',
      'pficon-warning-triangle-o': this.props.type === 'warning',
      'pficon-error-circle-o': this.props.type === 'error'
    });

    let timeString = moment(this.props.timestamp).format('MM/DD/YY h:mm:ss A');

    return (
      <div className={classes} role="alert">
        <span className={iconClass} aria-hidden="true"></span>
        <span>
          <strong>{this.props.title}</strong> {this.props.message}
        </span>
        <div className="pull-right">
          <span className="notification-time">{timeString}</span>
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
Notification.propTypes = {
  message: React.PropTypes.string.isRequired,
  removeNotification: React.PropTypes.func,
  timestamp: React.PropTypes.number,
  title: React.PropTypes.string,
  type: React.PropTypes.string,
  viewed: React.PropTypes.bool
};
Notification.defaultProps = {
  dismissable: true,
  title: '',
  type: 'error'
};
