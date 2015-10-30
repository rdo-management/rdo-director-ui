import React from 'react';

import { PageHeader } from '../ui/PageHeader';
import PlansStore from '../../stores/PlansStore';

export default class Plan extends React.Component {
  constructor() {
    super();
    this.state = {
      plan: PlansStore.getPlan(),
      planNames: PlansStore.getPlanNames()
    };
    this.changeListener = this._onChange.bind(this);
  }

  componentWillMount() {
    if(!this.state.plan.name) {
      this.props.history.pushState(null, '/plans/list');
    }
  }

  componentDidMount() {
    PlansStore.addChangeListener(this.changeListener);
  }

  componentWillUnmount() {
    PlansStore.removeChangeListener(this.changeListener);
  }

  _onChange() {
    this.setState({ plan: PlansStore.getPlan(), planNames: PlansStore.getPlanNames() });
  }

  _getHeadline() {
    if(this.state.plan.name) {
      return 'OpenStack Deployment - ' + this.state.plan.name;
    }
    return 'OpenStack Deployment';
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-12">
          <PageHeader>{this._getHeadline()}</PageHeader>
          {React.cloneElement(this.props.children, {plan: this.state.plan})}
        </div>
      </div>
    );
  }
}
