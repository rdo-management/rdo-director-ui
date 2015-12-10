import React from 'react';
import ClassNames from 'classnames';

import ValidationStage from './ValidationStage';

export default class ValidationsList extends React.Component {
  render () {
    let classes = ClassNames({
      'panel-group': true,
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

    let getValidationsContent = function (stages) {
      if (stages && stages.length > 0)
      {
        return (
          <div>
            {validationStages}
          </div>
        );
      }
      else
      {
        return (
          <div className="blank-slate-pf">
            <div className="blank-slate-pf-icon">
              <span className="pficon pficon-flag"></span>
            </div>
            <h1>No Validations</h1>
            <p>There are no validations at this time.</p>
          </div>
        );
      }
    };

    return (
      <div className={classes}>
        {getValidationsContent(this.props.validationStages)}
      </div>
    );
  }
}

ValidationsList.propTypes = {
  active: React.PropTypes.bool,
  validationStages: React.PropTypes.array
};
