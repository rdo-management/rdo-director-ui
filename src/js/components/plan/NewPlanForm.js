import React from 'react';
import PlanUploadActions from '../../actions/PlanUploadActions';
import { NewPlanFileList } from '../plan/NewPlanFileList';

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

export class NewPlanForm extends React.Component {

  constructor() {
    super();
    this.state = {
      files: [],
      name: undefined
    };
    this.onNameChange = this._onNameChange.bind(this);
    this.onPlanFilesChange = this._onPlanFilesChange.bind(this);
    this.onUploadClick = this._onUploadClick.bind(this);
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

  _onUploadClick(e) {
    e.preventDefault();
    PlanUploadActions.createPlan(this.state.name, this.state.files);
  }


  render () {
    return (
      <div>
        <div className="blank-slate-pf">
          <div className="blank-slate-pf-icon">
            <i className="fa fa-plus"></i>
          </div>
          <h1>Please Create a Plan</h1>
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
              <UploadButton onClick={this.onUploadClick} />
            </div>
          </form>
        </div>
        <NewPlanFileList files={this.state.files} />
      </div>
    );
  }
}
