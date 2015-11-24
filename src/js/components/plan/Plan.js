import React from 'react';

import { PageHeader } from '../ui/PageHeader';
import PlansStore from '../../stores/PlansStore';

export default class Plan extends React.Component {
  constructor() {
    super();
    this.state = {
      planName: PlansStore.getCurrentPlanName(),
      planNames: PlansStore.getPlanNames()
    };
    this.changeListener = this._onChange.bind(this);
  }

  componentDidMount() {
    PlansStore.addChangeListener(this.changeListener);
  }

  componentWillUnmount() {
    PlansStore.removeChangeListener(this.changeListener);
  }

  _onChange() {
    this.setState({ planName: PlansStore.getCurrentPlanName(),
                    planNames: PlansStore.getPlanNames() });
  }

  _getHeadline() {
    if(this.state.planName) {
      return 'OpenStack Deployment - ' + this.state.planName;
    }
    return 'OpenStack Deployment';
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-12">
          <PageHeader>{this._getHeadline()}</PageHeader>
          {React.cloneElement(this.props.children, {currentPlanName: this.state.planName})}
        </div>
      </div>
    );
  }
}
