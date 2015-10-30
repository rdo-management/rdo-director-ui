import React from 'react';
import PlanUploadActions from '../../actions/PlanUploadActions';
import PlanUploadStore from '../../stores/PlanUploadStore';

class FileInput extends React.Component {
  render() {

    let input = (
      <input type="file" onChange={this.props.onChange} id="{this.props.key}" name="{this.props.key}"/>
    )
    if(this.props.multiple) {
      input = (
        <input type="file" onChange={this.props.onChange} id="{this.props.key}" name="{this.props.key}" multiple/>
      )
    }

    return(
        <div className="form-group">
          <label className="col-sm-2 control-label" htmlFor="{this.props.key}">{this.props.label}</label>
          <div className="col-sm-10">
            {input}
          </div>
        </div>
    )
  }
}

export class PlanUploadForm extends React.Component {

  constructor() {
    super();
    this.state = {
      name: undefined
    };
    this.onNameChange = this._onNameChange.bind(this);
    this.onRootTemplateChange = this._onRootTemplateChange.bind(this);
    this.onEnvironmentFilesChange = this._onEnvironmentFilesChange.bind(this);
    this.onAdditionalFilesChange = this._onAdditionalFilesChange.bind(this);
    this.changeListener = this._changeListener.bind(this);
  }

  _onNameChange(e) {
    PlanUploadActions.changeName(e.target.value);
  }

  _onRootTemplateChange(e) {
    PlanUploadActions.addFiles(e.target.files, 'rootTemplate');
  }

  _onEnvironmentFilesChange(e) {
    PlanUploadActions.addFiles(e.target.files, 'environment');
  }

  _onAdditionalFilesChange(e) {
    PlanUploadActions.addFiles(e.target.files, 'files');
  }

  componentDidMount() {
    PlanUploadStore.addChangeListener(this.changeListener);
  }

  componentWillUnmount() {
    PlanUploadStore.removeChangeListener(this.changeListener);
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
            <input type="text" id="PlanName" name="PlanName" onChange={this.onNameChange} value={this.state.name} />
          </div>
        </div>

        <FileInput onChange={this.onRootTemplateChange}
                   key="PlanRootTemplate"
                   label="Root Template"/>

        <FileInput onChange={this.onEnvironmentFilesChange}
                   key="PlanEnvironmentFiles"
                   label="Environment File(s)"
                   multiple/>

        <FileInput onChange={this.onAdditionalFilesChange}
                   key="PlanAdditionalFiles"
                   label="Additional Files"
                   multiple/>

      </form>
    );
  }
}
