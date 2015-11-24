import React from 'react';

import { PageHeader } from '../ui/PageHeader';

export default class Plans extends React.Component {
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

Plans.propTypes = {
  children: React.PropTypes.node
};
