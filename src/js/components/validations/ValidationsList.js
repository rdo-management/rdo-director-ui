import React from 'react';

import ValidationStage from './ValidationStage';

export default class ValidationsList extends React.Component {
  render () {
    let validationStages = this.props.validationStages.map((validationStage, index) => {
      return (
        <ValidationStage key={index}
                         validations={validationStage.validations}
                         name={validationStage.name}
                         uuid={validationStage.uuid} />
      );
    });

    return (
      <div className="panel-group">
        {validationStages}
      </div>
    );
  }
}

ValidationsList.propTypes = {
  active: React.PropTypes.bool,
  validationStages: React.PropTypes.array
};
