import React from 'react';

import { PageHeader } from '../ui/PageHeader';

export default class Images extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-sm-12">
          <PageHeader>Images</PageHeader>
          <div className="panel panel-info">
            <div className="panel-heading">
              <h3 className="panel-title">
                <span className="pficon pficon-help"></span> Images
              </h3>
            </div>
            <div className="panel-body">
              <p>To build and upload Overcloud Images run</p>
              <pre>tripleo.sh --overcloud-images</pre>
              <p>To list Images run</p>
              <pre>glance image-list</pre>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
