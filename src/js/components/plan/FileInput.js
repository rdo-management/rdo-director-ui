import ClassNames from 'classnames';
import Formsy from 'formsy-react';
import React from 'react';

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

export default FileInput;
