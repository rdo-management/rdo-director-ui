import React from 'react';

import { PageHeader } from '../ui/PageHeader';
import PlansStore from '../../stores/PlansStore';

export default class Plan extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-sm-12">
          <PageHeader>OpenStack Deployment</PageHeader>
          {React.cloneElement(this.props.children)}
        </div>
      </div>
    );
  }
}
