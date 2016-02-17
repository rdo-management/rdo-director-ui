import ImmutablePropTypes from 'react-immutable-proptypes';
import ClassNames from 'classnames';
import React from 'react';

import BlankSlate from '../ui/BlankSlate';
import ValidationStage from './ValidationStage';

export default class ValidationsList extends React.Component {
  render () {
    const classes = ClassNames({
      'panel-group validation-stages-container col-sm-12': true,
      'collapsed': !this.props.active
    });

    const stages = this.props.validationStages.toList().map(stage => {
      return (
        <ValidationStage key={stage.uuid}
                         validations={stage.validations}
                         name={stage.name}
                         status={stage.status}
                         runValidationStage={this.props.runValidationStage}
                         runValidation={this.props.runValidation}
                         stopValidation={this.props.stopValidation}
                         uuid={stage.uuid}/>
      );
    });

    return (
      <div className={classes}>
        {this.props.validationStages.isEmpty() ?
          <BlankSlate iconClass="pficon pficon-flag"
                      title="No Validations"
                      message="There are no validations at this time." /> : stages}
      </div>
    );
  }
}

ValidationsList.propTypes = {
  active: React.PropTypes.bool,
  runValidation: React.PropTypes.func.isRequired,
  runValidationStage: React.PropTypes.func.isRequired,
  stopValidation: React.PropTypes.func.isRequired,
  validationStages: ImmutablePropTypes.map.isRequired
};
