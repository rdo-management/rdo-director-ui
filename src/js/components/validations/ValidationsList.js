import React from 'react';
import ClassNames from 'classnames';

import ValidationType from './ValidationType';

export default class ValidationsList extends React.Component {
  render() {
    let classes = ClassNames({
      'validations-list': true,
      'container-fluid': true,
      'closed': !this.props.active
    });

    let validationTypesComponents = this.props.validationTypes.map((validationType, index) => {
      return (
        <ValidationType key={index} validationType={validationType} />
      );
    });

    return (
      <div className={classes} id="validationsList">
        <div className="row validations-header">
          <span className="validations-title">Validations</span>
          <button className="close" onClick={this.props.onClose}>x</button>
        </div>
        <div className="row validation-types-container">
            {validationTypesComponents}
        </div>
      </div>
    );
  }
}
ValidationType.propTypes = {
  active: React.PropTypes.bool,
  validationTypes: React.PropTypes.array,
  onClose: React.PropTypes.func
};
