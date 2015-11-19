import React from 'react';
import ClassNames from 'classnames';

import ValidationStage from './ValidationStage';

export default class ValidationsList extends React.Component {
  render () {
    let classes = ClassNames({
      'col-sm-12': true,
      'validations-container': true,
      'collapsed': !this.props.active
    });

    let validationStages = this.props.validationStages.map((validationStage, index) => {
      return (
        <ValidationStage key={index}
                         validations={validationStage.validations}
                         name={validationStage.name}
                         uuid={validationStage.uuid} />
      );
    });

    return (
      <div className={classes}>
        {validationStages}
      </div>
    );
  }
}

ValidationsList.propTypes = {
  active: React.PropTypes.bool,
  validationStages: React.PropTypes.array
};
