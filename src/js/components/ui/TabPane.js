import ClassNames from 'classnames';
import React from 'react';

export default class TabPane extends React.Component {
  renderChildren() {
    if (this.props.renderOnlyActive) {
      return this.props.isActive ? this.props.children : null;
    }
    return this.props.children;
  }

  render() {
    let classes = ClassNames({
      'tab-pane': true,
      'active': this.props.isActive
    });

    return (
      <div className={classes}>
        {this.renderChildren()}
      </div>
    );
  }
}
TabPane.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node
  ]),
  isActive: React.PropTypes.bool.isRequired,
  renderOnlyActive: React.PropTypes.bool.isRequired
};
TabPane.defaultProps = {
  renderOnlyActive: false
};
