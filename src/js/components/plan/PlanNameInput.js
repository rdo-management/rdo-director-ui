import ClassNames from 'classnames';
import Formsy from 'formsy-react';
import React from 'react';

class PlanNameInput extends React.Component {

  changeValue(event) {
    this.props.setValue(event.currentTarget.value);
    this.props.onChange(event);
  }

  render() {
    let divClasses = ClassNames({
      'form-group': true,
      'has-error': this.props.showError(),
      'has-success': this.props.isValid(),
      'required': this.props.isRequired()
    });

    var errorMessage = this.props.getErrorMessage();

    return (
      <div className={divClasses}>
        <input id={this.props.name}
               ref="inputTag"
               placeholder={this.props.placeholder}
               name={this.props.name}
               type="text"
               onChange={this.changeValue.bind(this)}
               value={this.props.getValue()}/>
        <span>{errorMessage}</span>
      </div>
    );
  }
}

PlanNameInput.propTypes = {
  getErrorMessage: React.PropTypes.func,
  getValue: React.PropTypes.func,
  isRequired: React.PropTypes.func,
  isValid: React.PropTypes.func,
  name: React.PropTypes.string,
  onChange: React.PropTypes.func,
  placeholder: React.PropTypes.string,
  setValue: React.PropTypes.func,
  showError: React.PropTypes.func
};

PlanNameInput.defaultProps = {
  disabled: '',
  placeholder: ''
};

export default Formsy.HOC(PlanNameInput);
