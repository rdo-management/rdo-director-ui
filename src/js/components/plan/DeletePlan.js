import React from 'react';

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
      TripleOApiService.deletePlan(planName).then(() => {
        this.props.history.pushState(null, 'plans/list');
      });
    }
  }

  render () {
    return (
      <div className="new-plan">
        <div className="blank-slate-pf clearfix">
          <div className="blank-slate-pf-icon">
            <i className="fa fa-trash"></i>
          </div>
          <h1>Delete plan: {this.getNameFromUrl()}</h1>
            <button className="btn btn-lg btn-danger"
                    onClick={this.onDeleteClick}
                    type="submit">
              Delete Plan
            </button>
        </div>
      </div>
    );
  }
}

DeletePlan.propTypes = {
  history: React.PropTypes.object,
  params: React.PropTypes.object
};
