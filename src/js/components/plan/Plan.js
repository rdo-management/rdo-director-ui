import React from 'react';

import { PageHeader } from '../ui/PageHeader';
import PlansStore from '../../stores/PlansStore';

export default class Plan extends React.Component {
  constructor() {
    super();
    this.state = {
      // plan: PlanStore.getPlan('uuid from route');
      plan: {
      }
    };
    this.changeListener = this._onChange.bind(this);
  }

  componentWillMount() {
    // TODO(flfuchs) check url param this.props.params.planName
    // to see if the current plan needs to be updated.
  }

  componentDidMount() {
    // PlanStore.addChangeListener(this.changeListener);
  }

  componentWillUnmount() {
    // PlanStore.removeChangeListener(this.changeListener);
  }

  _onChange() {
    // this.setState({ plan: PlanStore.getPlan('uuid from route') });
  }

  getPlanHeader() {
    let planName = PlansStore.getPlanName();
    let baseHeader = 'OpenStack Deployment';
    if(planName) {
      return baseHeader + ' - ' + planName;
    }
    return baseHeader;
  }

  render() {
    let planHeader = this.getPlanHeader();
    // TODO(flfuchs) receive plan data by planName
    console.log('planName', this.props.params.planName);
    return (
      <div className="row">
        <div className="col-sm-12">
          <PageHeader>{planHeader}</PageHeader>
          {React.cloneElement(this.props.children, {plan: this.state.plan})}
        </div>
      </div>
    );
  }
}
Plan.propTypes = {
  children: React.PropTypes.node
};
