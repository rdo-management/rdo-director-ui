import React from 'react';
import ClassNames from 'classnames';

export default class Notification extends React.Component {
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
