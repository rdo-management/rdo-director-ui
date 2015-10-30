import React from 'react';
import PlanUploadActions from '../../actions/PlanUploadActions';
import PlanUploadStore from '../../stores/PlanUploadStore';

class UploadButton extends React.Component {
  constructor() {
    super();
    this.onUploadClick = this._onUploadClick.bind(this);
  }

  _onUploadClick(e) {
    PlanUploadActions.createPlan();
    e.preventDefault();
  }

  render() {
    return (
        <button onClick={this.onUploadClick}>
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
          <label className="col-sm-2 control-label" htmlFor="{this.props.key}">
            {this.props.label}
          </label>
          <div className="col-sm-10">
            <input ref="inputTag"
                   type="file"
                   onChange={this.props.onChange}
                   id="{this.props.key}"
                   name="{this.props.key}"
                   multiple/>
          </div>
          <div className="col-sm-10 col-sm-offset-2">
            <UploadButton/>
          </div>
        </div>
    );
  }
}

export class PlanUploadForm extends React.Component {

  constructor() {
    super();
    this.state = {
      name: undefined
    };
    this.onNameChange = this._onNameChange.bind(this);
    this.onPlanFilesChange = this._onPlanFilesChange.bind(this);
    this.changeListener = this._changeListener.bind(this);
  }

  componentDidMount() {
    PlanUploadStore.addChangeListener(this.changeListener);
  }

  componentWillUnmount() {
    PlanUploadStore.removeChangeListener(this.changeListener);
  }

  _onNameChange(e) {
    PlanUploadActions.changeName(e.target.value);
  }

  _onPlanFilesChange(e) {
    PlanUploadActions.addFiles(e.target.files, 'files');
  }

  _changeListener() {
    this.setState({ name: PlanUploadStore.getState().name });
  }

  render () {
    return (
      <form className="form-horizontal">
        <div className="form-group">
          <label className="col-sm-2 control-label" htmlFor="PlanName">Plan Name</label>
          <div className="col-sm-10">
            <input type="text"
                   id="PlanName"
                   name="PlanName"
                   onChange={this.onNameChange}
                   value={this.state.name} />
          </div>
        </div>
        <FileInput onChange={this.onPlanFilesChange}
                   key="PlanFiles"
                   label="Plan Files"
                   multiple/>
      </form>
    );
  }
}
