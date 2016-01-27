import React from 'react';

import { PageHeader } from '../ui/PageHeader';

export default class Flavors extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-sm-12">
          <PageHeader>Flavors</PageHeader>
          <div className="panel panel-info">
            <div className="panel-heading">
              <h3 className="panel-title">
                <span className="pficon pficon-help"></span> Flavors
              </h3>
            </div>
            <div className="panel-body">
              <p>To create Flavors based on introspected Nodes run</p>
              <pre>tripleo.sh --flavors</pre>
              <p>To list Flavors run</p>
              <pre>nova flavor-list</pre>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
