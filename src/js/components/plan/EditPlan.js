import Formsy from 'formsy-react';
import React from 'react';

import FileList from './FileList';
import FileInput from './FileInput';
import FormErrorList from '../ui/forms/FormErrorList';
import TripleOApiService from '../../services/TripleOApiService';

export default class EditPlan extends React.Component {

  constructor() {
    super();
    this.state = {
      name: undefined,
      files: [],
      canSubmit: false,
      formErrors: []
    };
  }

  onPlanFilesChange(e) {
    let files = [];
    for(let i=0, l=e.target.files.length; i<l; i++) {
      let reader = new FileReader();
      let file = e.target.files[i];
      if(file.name.match(/(\.yaml|\.json)$/)) {
        reader.onload = (f => {
          return e => {
            let obj = {
              name: f.webkitRelativePath.replace(/^[^\/]*\//, ''),
              content: e.target.result
            };
            files.push(obj);
            this.setState({files: files});
          };
        }(file));
        reader.readAsText(file);
      }
    }
  }

  onFormSubmit(form) {
    let planName = this.getNameFromUrl();
    if(planName) {
      TripleOApiService.updatePlan(planName, this.state.files).then(() => {
        this.props.history.pushState(null, 'plans/list');
      });
    }
  }

  onFormValid() {
    this.setState({canSubmit: true});
  }

  onFormInvalid() {
    this.setState({canSubmit: false});
  }

  getNameFromUrl() {
    let planName = this.props.params.planName || '';
    return planName.replace(/[^A-Za-z0-9_-]*/g, '');
  }

  render () {
    return (
      <div className="new-plan">
        <div className="blank-slate-pf clearfix">
          <div className="blank-slate-pf-icon">
            <i className="fa fa-edit"></i>
          </div>
          <h1>Replace Files for plan: {this.getNameFromUrl()}</h1>
          <FormErrorList errors={this.state.formErrors}/>
          <Formsy.Form ref="NewPlanForm"
                       role="form"
                       className="form new-plan-form col-sm-6 col-sm-offset-3"
                       onValidSubmit={this.onFormSubmit.bind(this)}
                       onValid={this.onFormValid.bind(this)}
                       onInvalid={this.onFormInvalid.bind(this)}>
            <div className="form-group">
                <FileInput onChange={this.onPlanFilesChange.bind(this)}
                           name="PlanFiles"
                           label="Plan Files"
                           validations="hasPlanFiles"
                           multiple/>
            </div>
            <div className="blank-slate-pf-main-action">
              <button disabled={!this.state.canSubmit}
                      className="btn btn-primary btn-lg"
                      type="submit">
                Upload Files and Create Plan
              </button>
            </div>
          </Formsy.Form>
        </div>
        <FileList files={this.state.files} />
      </div>
    );
  }
}

EditPlan.propTypes = {
  history: React.PropTypes.object,
  params: React.PropTypes.object
};

Formsy.addValidationRule('hasPlanFiles', function (values, value) {
  if(value && value.length > 0) {
    return true;
  }
  return false;
});
