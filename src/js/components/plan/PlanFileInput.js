import Formsy from 'formsy-react';
import React from 'react';

class PlanFileInput extends React.Component {

  componentDidMount() {
    // Attributes not in react's whitelist need to be added after mounting.
    this.refs.inputTag.setAttribute('webkitdirectory', 'webkitdirectory');
  }

  changeValue(event) {
    this.props.setValue(event.target.files);
    this.props.onChange(event);
  }

  render() {
    return(
      <div className="form-group">
        <input ref="inputTag"
               type="file"
               onChange={this.changeValue.bind(this)}
               id={this.props.name}
               name={this.props.name}
               multiple/>
      </div>
    );
  }
}

PlanFileInput.propTypes = {
  name: React.PropTypes.string,
  onChange: React.PropTypes.func,
  setValue: React.PropTypes.func
};

export default Formsy.HOC(PlanFileInput);
