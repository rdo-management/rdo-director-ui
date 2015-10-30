import when from 'when';
import React from 'react';

import AppDispatcher from '../../dispatchers/AppDispatcher.js';
import AuthenticatedComponent from '../utils/AuthenticatedComponent';
import PlansConstants from '../../constants/PlansConstants';
import TripleOApiService from '../../services/TripleOApiService';

class UploadButton extends React.Component {
  render() {
    return (
        <button className="btn btn-primary btn-lg" onClick={this.props.onClick}>
          Upload Files and Create Plan
        </button>
    );
  }
}

class FileInput extends React.Component {
  componentDidMount() {
    // Attributes not in react's whitelist need to be added after mounting.
    this.refs.inputTag.setAttribute('webkitdirectory', 'webkitdirectory');
  }

  render() {
    return(
      <div className="form-group">
        <input ref="inputTag"
               type="file"
               onChange={this.props.onChange}
               id="{this.props.key}"
               name="{this.props.key}"
               multiple/>
      </div>
    );
  }
}

class FileList extends React.Component {
  constructor() {
    super();
  }

  render() {
    if(!this.props.files || this.props.files.length === 0) {
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

export default AuthenticatedComponent (class NewPlanForm extends React.Component {

  constructor() {
    super();
    this.state = {
      files: [],
      name: undefined
    };
    this.onNameChange = this._onNameChange.bind(this);
    this.onPlanFilesChange = this._onPlanFilesChange.bind(this);
    this.createPlan = this._createPlan.bind(this);
  }

  _onNameChange(e) {
    this.setState({name: e.target.value});
  }

  _onPlanFilesChange(e) {
    this.setState({files: []});
    let files = [];
    for(let i=0, l=e.target.files.length; i<l; i++) {
      let reader = new FileReader();
      let file = e.target.files[i];
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

  _createPlan(e) {
    // TODO(flfuchs): Some basic input validation (name A-Za-z0-9 etc.)
    e.preventDefault();
    when(TripleOApiService.createPlan(this.state.name, this.state.files).then(result => {
      AppDispatcher.dispatch({
        actionType: PlansConstants.PLAN_CREATED
      });
    }));
  }

  render () {
    return (
      <div>
        <div className="blank-slate-pf">
          <div className="blank-slate-pf-icon">
            <i className="fa fa-plus"></i>
          </div>
          <h1>Create New Plan</h1>
          <form>
            <div className="form-group">
              <div className="col-sm-3 col-sm-offset-3">
                <input type="text"
                       id="PlanName"
                       name="PlanName"
                       placeholder="Plan Name"
                       onChange={this.onNameChange}
                       value={this.state.name} />
              </div>
              <div className="col-sm-6">
                <FileInput onChange={this.onPlanFilesChange}
                           key="PlanFiles"
                           label="Plan Files"
                           multiple/>
              </div>
            </div>
            <div className="blank-slate-pf-main-action">
              <UploadButton onClick={this.createPlan} />
            </div>
          </form>
        </div>
        <FileList files={this.state.files} />
      </div>
    );
  }
});
