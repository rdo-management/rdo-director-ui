import ClassNames from 'classnames';
import React from 'react';
import * as _ from 'lodash';

export default class FormErrorList extends React.Component {
  render() {
    let errors = this.props.errors.map((error, index) => {
      return (
        <FormError key={index}
                   title={error.title}
                   message={error.message}
                   type={error.type}/>
      );
    });

    if (_.isEmpty(errors)) {
      return null;
    } else {
      return (
        <div>
          {errors}
        </div>
      );
    }
  }
}
FormErrorList.propTypes = {
  errors: React.PropTypes.array.isRequired
};

export class FormError extends React.Component {
  render() {
    let classes = ClassNames({
      'alert': true,
      'alert-danger': this.props.type === 'error',
      'alert-warning': this.props.type === 'warning',
      'alert-success': this.props.type === 'success',
      'alert-info': this.props.type === 'info'
    });

    return (
      <div className={classes} role="alert">
        <strong>{this.props.title} </strong>
        {this.props.message}
      </div>
    );
  }
}
FormError.propTypes = {
  message: React.PropTypes.string.isRequired,
  title: React.PropTypes.string,
  type: React.PropTypes.string
};
FormError.defaultProps = {
  title: '',
  type: 'error'
};
