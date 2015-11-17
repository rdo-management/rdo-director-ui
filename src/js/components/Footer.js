import React from 'react';

import ValidationsIndicator from './ui/validations/ValidationsIndicator';

export default class Footer extends React.Component {
  render() {
    return (
      <footer className="navbar-fixed-bottom wrapper-footer">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <ValidationsIndicator />
              <p className="pull-right">&copy; 2015 Company Name</p>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
