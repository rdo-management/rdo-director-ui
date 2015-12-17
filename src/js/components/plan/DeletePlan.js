import React from 'react';
import { Link } from 'react-router';

import NotificationActions from '../../actions/NotificationActions';
import PlansActions from '../../actions/PlansActions';
import TripleOApiErrorHandler from '../../services/TripleOApiErrorHandler';
import TripleOApiService from '../../services/TripleOApiService';

export default class DeletePlan extends React.Component {

  constructor() {
    super();
    this.onDeleteClick = this._onDeleteClick.bind(this);
  }

  getNameFromUrl() {
    let planName = this.props.params.planName || '';
    return planName.replace(/[^A-Za-z0-9_-]*/g, '');
  }

  _onDeleteClick() {
    let planName = this.getNameFromUrl();
    if(planName) {
      PlansActions.deletingPlan(planName);
      this.props.history.pushState(null, 'plans/list');
      TripleOApiService.deletePlan(planName).then(result => {
        PlansActions.planDeleted(planName);
        NotificationActions.notify({
          title: 'Plan Deleted',
          message: `The plan ${planName} was successfully deleted.`,
          type: 'success'
        });
      }).catch(error => {
        console.error('Error in DeletePlan._ondeleteClick', error); //eslint-disable-line no-console
        PlansActions.listPlans();
        let errorHandler = new TripleOApiErrorHandler(error);
        errorHandler.errors.forEach((error) => {
          NotificationActions.notify({
            title: 'Error Deleting Plan',
            message: `The plan ${planName} could not be deleted. ${error.message}`,
            type: 'error'
          });
        });
      });
    }
  }

  render () {
    return (
      <div>
        <div className="modal modal-routed in" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <Link to="/plans/list"
                      type="button"
                      className="close">
                  <span className="pficon pficon-close"></span>
                </Link>
                <h4 className="modal-title">
                  <span className="pficon pficon-delete"></span> Delete {this.getNameFromUrl()}
                </h4>
              </div>
              <div className="modal-body">
                <p>
                  Are you sure you want to delete plan <strong>{this.getNameFromUrl()}</strong>?
                </p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-danger"
                        onClick={this.onDeleteClick}
                        type="submit">
                  Delete Plan
                </button>
                <Link to="/plans/list" type="button" className="btn btn-default" >Cancel</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-backdrop in"></div>
      </div>
    );
  }
}

DeletePlan.propTypes = {
  history: React.PropTypes.object,
  params: React.PropTypes.object
};
