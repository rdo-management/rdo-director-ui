import ClassNames from 'classnames';
import Formsy from 'formsy-react';
import React from 'react';

let GroupedCheckBox = React.createClass({

  propTypes: {
    description: React.PropTypes.string,
    id: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    title: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired
  },

  mixins: [Formsy.Mixin],

  getDefaultProps: function() {
    return {
      type: 'checkbox'
    };
  },

  changeValue: function(event) {
    this.props.onChange(event.target.checked, this.props.name);
    this.setValue(event.target.checked);
  },

  renderErrorMessage: function() {
    let errorMessage = this.getErrorMessage();
    return errorMessage ? (
      <span className='help-block'>{errorMessage}</span>
    ) : false;
  },

  renderDescription: function() {
    let description = this.props.description;
    return description ? (
      <small className='help-block'>{description}</small>
    ) : false;
  },

  render: function() {
    let divClasses = ClassNames({
      'checkbox': this.props.type === 'checkbox',
      'radio': this.props.type === 'radio',
      'has-error': this.showError(),
      'required': this.showRequired()
    });

    return (
      <div className={divClasses}>
        <label htmlFor={this.props.id} className="control-label">
          <input type={this.props.type}
                 name={this.props.name}
                 ref={this.props.id}
                 id={this.props.id}
                 onChange={this.changeValue}
                 checked={!!this.getValue()}
                 value={this.getValue()}/>
          {this.props.title}
        </label>
        {this.renderErrorMessage()}
        {this.renderDescription()}
      </div>
    );
  }
});

module.exports = GroupedCheckBox;
