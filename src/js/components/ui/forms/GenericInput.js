import ClassNames from 'classnames';
import Formsy from 'formsy-react';
import React from 'react';
// import ReactMixin from 'react-mixin';

let GenericInput = React.createClass({

  propTypes: {
    name: React.PropTypes.string.isRequired,
    placeholder: React.PropTypes.string,
    title: React.PropTypes.string.isRequired,
    type: React.PropTypes.string
  },

  mixins: [Formsy.Mixin],

  getDefaultProps: function() {
    return {
      type: 'text'
    };
  },

  changeValue: function(event) {
    this.setValue(event.currentTarget.value);
  },

  render: function() {
    let divClasses = ClassNames({
      'form-group': true,
      'has-error': this.showError(),
      'has-success': this.isValid(),
      'required': this.isRequired()
    });

    let errorMessage = this.getErrorMessage();
    return (
      <div className={divClasses}>
        <label htmlFor={this.props.name} className="control-label">{this.props.title}</label>
        <input type={this.props.type}
               name={this.props.name}
               ref={this.props.name}
               id={this.props.name}
               className="form-control"
               onChange={this.changeValue}
               value={this.getValue()}
               placeholder={this.props.placeholder} />
        <span className='help-block'>{errorMessage}</span>
      </div>
    );
  }
});

module.exports = GenericInput;
// GenericInput.propTypes = {
//   name: React.PropTypes.string.isRequired,
//   placeholder: React.PropTypes.string,
//   title: React.PropTypes.string.isRequired,
//   type: React.PropTypes.string
// };


// ReactMixin(GenericInput.prototype, Formsy.Mixin);

// TODO(jtomasek): This class needs to be defined using createClass because
// the Formsy.Mixin uses getDefaultProps and getInitialState methods. Fix this
// when Formsy fixes it
