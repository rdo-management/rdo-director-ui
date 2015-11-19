import React from 'react';
import ClassNames from 'classnames';

import ValidationStage from './ValidationStage';

export default class ValidationsList extends React.Component {
  render() {
    let classes = ClassNames({
      'validations-list': true,
      'closed': !this.props.active
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
        <div className="validations-header">
          <span className="validations-title">Validations</span>
          <button className="close" onClick={this.props.onClose}>x</button>
        </div>
        <div className="validation-stages-container">
          {validationStages}
        </div>
      </div>
    );
  }
}
ValidationsList.propTypes = {
  active: React.PropTypes.bool,
  onClose: React.PropTypes.func,
  validationStages: React.PropTypes.array
};
