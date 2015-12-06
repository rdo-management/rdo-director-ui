import ClassNames from 'classnames';
import React from 'react';

export default class TabPane extends React.Component {
  render() {
    let classes = ClassNames({
      'tab-pane': true,
      'active': this.props.isActive
    });

    return (
      <div className={classes}>
        {this.props.children}
      </div>
    );
  }
}
TabPane.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node
  ]),
  isActive: React.PropTypes.bool
};
