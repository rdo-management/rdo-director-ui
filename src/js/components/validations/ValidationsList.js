import React from 'react';
import ClassNames from 'classnames';

import BlankSlate from '../ui/BlankSlate';
import ValidationStage from './ValidationStage';

export default class ValidationsList extends React.Component {

  getValidationsContent  (stages) {
    let validationStages = this.props.validationStages.map((validationStage, index) => {
      return (
        <ValidationStage key={index}
                         validations={validationStage.validations}
                         name={validationStage.name}
                         uuid={validationStage.uuid} />
      );
    });

    if (stages && stages.length > 0) {
      return (
        <div>
          {validationStages}
        </div>
      );
    }
    else {
      return (
        <BlankSlate iconClass="pficon pficon-flag"
                    title="No Validations"
                    message="There are no validations at this time." />
      );
    }
  }

  render () {
    let classes = ClassNames({
      'panel-group validation-stages-container col-sm-12': true,
      'collapsed': !this.props.active
    });

    return (
      <div className={classes}>
        {this.getValidationsContent(this.props.validationStages)}
      </div>
    );
  }
}

ValidationsList.propTypes = {
  active: React.PropTypes.bool,
  validationStages: React.PropTypes.array
};
