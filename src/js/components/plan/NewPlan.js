import ClassNames from 'classnames';
import Formsy from 'formsy-react';
import React from 'react';

import FormErrorList from '../ui/forms/FormErrorList';
import TripleOApiService from '../../services/TripleOApiService';

class FileList extends React.Component {
  constructor() {
    super();
  }

  render() {
    if(this.props.files.length === 0) {
      return (
        <div></div>
      );
    }
    let files = this.props.files.map(file => {
      return (
        <tr key={file.name}>
          <td>{file.name}</td>
        </tr>
      );
    });
    // TODO(flfuchs): This needs to go into a collapsible panel.
    return (
      <div className="panel panel-default">
        <div className="panel-heading" role="tab" id="plan-files-list-panel">
          <h4 className="panel-title">Plan Files</h4>
        </div>
        <table className="table upload-files">
          <tbody>
            {files}
          </tbody>
        </table>
      </div>
    );
  }
}
FileList.propTypes = {
  files: React.PropTypes.array.isRequired
};
FileList.defaultProps = {
  files: []
};

let NameInput = React.createClass({
  mixins: [Formsy.Mixin],

  changeValue(event) {
    this.setValue(event.currentTarget.value);
    this.props.onChange(event);
  },

  render() {
    let divClasses = ClassNames({
      'form-group': true,
      'has-error': this.showError(),
      'has-success': this.isValid(),
      'required': this.isRequired()
    });

    var errorMessage = this.getErrorMessage();

    return (
      <div className={divClasses}>
        <input id={this.props.name}
               placeholder={this.props.placeholder}
               name={this.props.name}
               type="text"
               onChange={this.changeValue}
               value={this.getValue()}/>
        <span>{errorMessage}</span>
      </div>
    );
  }

});

let FileInput = React.createClass({
  mixins: [Formsy.Mixin],

  componentDidMount() {
    // Attributes not in react's whitelist need to be added after mounting.
    this.refs.inputTag.setAttribute('webkitdirectory', 'webkitdirectory');
  },

  changeValue(event) {
    this.setValue(event.target.files);
    this.props.onChange(event);
  },

  render() {
    return(
      <div className="form-group">
        <input ref="inputTag"
               type="file"
               onChange={this.changeValue}
               id={this.props.name}
               name={this.props.name}
               multiple/>
      </div>
    );
  }
});

export default class NewPlanForm extends React.Component {

  constructor() {
    super();
    this.state = {
      name: undefined,
      files: [],
      canSubmit: false,
      formErrors: []
    };
  }

  onNameChange(e) {
    this.setState({name: e.target.value});
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
    TripleOApiService.createPlan(this.state.name, this.state.files).then(() => {
      //TODO(jtomasek): move the createPlan contents here
      this.props.history.pushState(null, 'plans/list');
    });
  }

  onFormValid() {
    this.setState({canSubmit: true});
  }

  onFormInvalid() {
    this.setState({canSubmit: false});
  }

  render () {
    return (
      <div className="new-plan">
        <div className="blank-slate-pf clearfix">
          <div className="blank-slate-pf-icon">
            <i className="fa fa-plus"></i>
          </div>
          <h1>Create New Plan</h1>
          <FormErrorList errors={this.state.formErrors}/>
          <Formsy.Form ref="NewPlanForm"
                       role="form"
                       className="form new-plan-form col-sm-6 col-sm-offset-3"
                       onValidSubmit={this.onFormSubmit.bind(this)}
                       onValid={this.onFormValid.bind(this)}
                       onInvalid={this.onFormInvalid.bind(this)}>
            <div className="form-group">
              <NameInput id="PlanName"
                     name="PlanName"
                     placeholder="Add a Plan Name"
                     onChange={this.onNameChange.bind(this)}
                     validations={{matchRegexp: /^[A-Za-z0-9_-]+$/}}
                     validationError="Please use only alphanumeric characters and - or _"
                     required />
            </div>
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

Formsy.addValidationRule('hasPlanFiles', function (values, value) {
  if(value && value.length > 0) {
    return true;
  }
  return false;
});
