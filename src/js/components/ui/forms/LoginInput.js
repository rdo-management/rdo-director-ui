import Formsy from 'formsy-react';
import React from 'react';

let LoginInput = React.createClass({

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

    let errorMessage = this.getErrorMessage();

    return (
      <div className="form-group">
        <label className="col-sm-2 col-md-2 control-label" htmlFor={this.props.name}>
          {this.props.title}
        </label>
        <div className="col-sm-10 col-md-10">
          <input type={this.props.type}
                 name={this.props.name}
                 ref={this.props.name}
                 className="form-control"
                 id={this.props.name}
                 onChange={this.changeValue}
                 value={this.getValue()}
                 placeholder={this.props.placeholder} />
          <span className='help-block'>{errorMessage}</span>
        </div>
      </div>
    );
  }
});

module.exports = LoginInput;
