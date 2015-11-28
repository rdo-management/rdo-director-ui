import ClassNames from 'classnames';
import Formsy from 'formsy-react';
import React from 'react';

class PlanFileInput extends React.Component {

  componentDidMount() {
    // Attributes not in react's whitelist need to be added after mounting.
    this.refs[this.props.name].setAttribute('webkitdirectory', 'webkitdirectory');
  }

  processFiles(event) {
    let files = [];
    for(let i=0, l=event.target.files.length; i<l; i++) {
      let reader = new FileReader();
      let file = event.target.files[i];
      reader.onload = (f => {
        return e => {
          if(file.name.match(/(\.yaml|\.json)$/)) {
            let obj = {
              name: f.webkitRelativePath.replace(/^[^\/]*\//, ''),
              content: e.target.result
            };
            files.push(obj);
          }
          // if the last file is processed, setValue -> triggers onChange on Formsy.Form
          if(i === l-1) {
            this.props.setValue(files);
          }
        };
      }(file));
      reader.readAsText(file);
    }
  }

  renderErrorMessage() {
    let errorMessage = this.props.getErrorMessage();
    return errorMessage ? (
      <span className='help-block'>{errorMessage}</span>
    ) : false;
  }

  renderDescription() {
    let description = this.props.description;
    return description ? (
      <small className='help-block'>{description}</small>
    ) : false;
  }

  render() {
    let divClasses = ClassNames({
      'form-group': true,
      'has-error': this.props.showError(),
      'has-success': this.props.isValid(),
      'required': this.props.isRequired()
    });

    return(
      <div className={divClasses}>
        <label htmlFor={this.props.name}
               className={`${this.props.labelColumnClasses} control-label`}>
          {this.props.title}
        </label>
        <div className={this.props.inputColumnClasses}>
          <input type="file"
                 name={this.props.name}
                 ref={this.props.name}
                 id={this.props.name}
                 onChange={this.processFiles.bind(this)}
                 multiple/>
          {this.renderErrorMessage()}
          {this.renderDescription()}
        </div>
      </div>
    );
  }
}
PlanFileInput.propTypes = {
  description: React.PropTypes.string,
  getErrorMessage: React.PropTypes.func,
  getValue: React.PropTypes.func,
  inputColumnClasses: React.PropTypes.string.isRequired,
  isRequired: React.PropTypes.func,
  isValid: React.PropTypes.func,
  labelColumnClasses: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  setValue: React.PropTypes.func,
  showError: React.PropTypes.func,
  title: React.PropTypes.string.isRequired
};
PlanFileInput.defaultProps = {
  inputColumnClasses: 'col-sm-10',
  labelColumnClasses: 'col-sm-2'
};

export default Formsy.HOC(PlanFileInput);
