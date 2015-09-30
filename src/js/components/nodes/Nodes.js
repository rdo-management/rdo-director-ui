import React from 'react';

import AuthenticatedComponent from '../utils/AuthenticatedComponent';
import { PageHeader } from '../ui/PageHeader';


export default AuthenticatedComponent(class Nodes extends React.Component {
  render() {
    return (
      <div className="row">
        <PageHeader>Nodes</PageHeader>
      </div>
    );
  }
});
