import React from 'react';
import ClassNames from 'classnames';

import ValidationType from './ValidationType';

export default class ValidationsList extends React.Component {
  render () {
    let classes = ClassNames({
      'col-sm-12': true,
      'validations-container': true,
      'collapsed': !this.props.active
    });

    let validationTypesComponents = this.props.validationTypes.map((validationType, index) => {
      return (
        <ValidationType key={index} validationType={validationType} />
      );
    });

    return (
      <div className={classes}>
        {validationTypesComponents}
      </div>
    );
  }
}

ValidationsList.propTypes = {
  active: React.PropTypes.bool,
  validationTypes: React.PropTypes.array
};
