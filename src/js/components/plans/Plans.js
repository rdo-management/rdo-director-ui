import React from 'react';

import AuthenticatedComponent from '../utils/AuthenticatedComponent';
import { PageHeader } from '../ui/PageHeader';
import { PlanUploadFileList } from '../plans/PlanUploadFileList';
import { PlanUploadForm } from '../plans/PlanUploadForm';

export default AuthenticatedComponent(class Plans extends React.Component {

  constructor() {
    super();
    this.state = {
      plans: []
    };
    this.changeListener = this._changeListener.bind(this);
  }

  componentDidMount() {
    //PlanUploadStore.addChangeListener(this.changeListener);
  }

  componentWillUnmount() {
    //PlanUploadStore.removeChangeListener(this.changeListener);
  }

  _changeListener() {
    //this.setState({});
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-12">
          <PageHeader>Plans</PageHeader>
          <PlanUploadForm />
          <PlanUploadFileList />
        </div>
      </div>
    );
  }

});
