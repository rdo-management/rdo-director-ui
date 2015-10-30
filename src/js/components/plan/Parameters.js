import React from 'react';

import { PageHeader } from '../ui/PageHeader';
import PlanRedirect from '../utils/PlanRedirect';

export default class Parameters extends React.Component {

  componentWillMount() {
    PlanRedirect.choosePlanOrRedirect(this.props);
  }

  render() {
    return (
      <PageHeader>Service Configuration</PageHeader>
    );
  }
}
