import ClassNames from 'classnames';
import React from 'react';

import FormErrorList from '../ui/forms/FormErrorList';
import TripleOApiService from '../../services/TripleOApiService';

export default class NewPlanForm extends React.Component {

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
    if(!!planName) {
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
            <i className="fa fa-delete"></i>
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
