import React from 'react';
import ClassNames from 'classnames';
import {FormattedDate} from 'react-intl';


export default class NotificationListItem extends React.Component {
  render() {
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
      <tr className={this.props.viewed ? '' : 'unviewed'} role="alert">
        <td>
          <span className={iconClass} aria-hidden="true"/>
          <strong>{this.props.title}</strong>
        </td>
        <td>
          <span>{this.props.message}</span>
        </td>
        <td>
          <FormattedDate value={notificationDate}
                         month="numeric" day="numeric" year="numeric"
                         hour="numeric" minute="numeric" second="numeric" />
        </td>
        <td>
          <button type="button"
                  className="btn btn-primary btn-xs pull-right"
                  onClick={this.props.removeNotification}>
            Dismiss
          </button>
        </td>
      </tr>
    );
  }
}
NotificationListItem.propTypes = {
  message: React.PropTypes.string.isRequired,
  removeNotification: React.PropTypes.func.isRequired,
  timestamp: React.PropTypes.number.isRequired,
  title: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  viewed: React.PropTypes.bool.isRequired
};
NotificationListItem.defaultProps = {
  title: '',
  type: 'error'
};
