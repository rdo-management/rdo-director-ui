import { Link } from 'react-router';
import React from 'react';

import Loader from '../ui/Loader';
import NoPlans from './NoPlans';
import NotificationActions from '../../actions/NotificationActions';
import PlansStore from '../../stores/PlansStore';
import TripleOApiService from '../../services/TripleOApiService';
import TripleOApiErrorHandler from '../../services/TripleOApiErrorHandler';


export default class Plan extends React.Component {
  constructor() {
    super();
    this.state = {
      currentPlanName: PlansStore.getCurrentPlanName()
    };
    this.changeListener = this._onChange.bind(this);
  }

  componentDidMount() {
    PlansStore.addChangeListener(this.changeListener);
  }

  componentWillUnmount() {
    PlansStore.removeChangeListener(this.changeListener);
  }

  _onChange() {
    this.setState({ currentPlanName: PlansStore.getCurrentPlanName() });
  }

  handleDeploy() {
    TripleOApiService.deployPlan(this.state.currentPlanName).then((response) => {
      this.setState({ parameters: response.parameters });
      NotificationActions.notify({
        title: 'Deployment started',
        message: 'The Deployment has been successfully initiated',
        type: 'success'
      });
    }).catch((error) => {
      let errorHandler = new TripleOApiErrorHandler(error);
      errorHandler.errors.forEach((error) => {
        NotificationActions.notify(error);
      });
    });
  }

  render() {
    return (
      <div className="row">
        <Loader loaded={PlansStore.getState().plansLoaded}
                content="Loading Deployments..."
                global>
          {this.state.currentPlanName ? (
            <div className="col-sm-12">
              <div className="page-header">
                <div className="actions pull-right">
                  <a className="link btn btn-primary btn-lg"
                     onClick={this.handleDeploy.bind(this)}>
                    <span className="fa fa-send"/> Deploy
                  </a>
                </div>
                <h1>OpenStack Deployment - {this.state.currentPlanName}</h1>
                <p>
                  Enabled Environment Names List (TBD) <Link to="/overview/environment">Edit</Link>
                  <br/>
                  <Link to="/overview/parameters">Configure Deployment Parameters</Link>
                </p>
              </div>
              {React.cloneElement(this.props.children,
                                  {currentPlanName: this.state.currentPlanName})}
            </div>
          ) : (
            <div className="col-sm-12">
              <NoPlans/>
            </div>
          )}
        </Loader>
      </div>
    );
  }
}

Plan.propTypes = {
  children: React.PropTypes.node
};
