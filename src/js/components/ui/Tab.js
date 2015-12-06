import React from 'react';

export default class Tab extends React.Component {
  render() {
    let className = this.props.isActive ? 'active' : '';
    return <li className={className}>{this.props.children}</li>;
  }
}
Tab.propTypes = {
  isActive: React.PropTypes.bool.isRequired
};
