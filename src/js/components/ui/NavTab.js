import React from 'react';
import { Link } from 'react-router';

export default class NavTab extends Link {
  render() {
    let history = this.context.history;
    let isActive = history.isActive(this.props.to, this.props.query, this.props.onlyActiveOnIndex);
    let className = isActive ? 'active' : '';
    let link = (
      <Link {...this.props}/>
    );
    return <li className={className}>{link}</li>;
  }
}
NavTab.propTypes = {
  onlyActiveOnIndex: React.PropTypes.bool.isRequired,
  query: React.PropTypes.object,
  to: React.PropTypes.oneOfType([ React.PropTypes.string, React.PropTypes.route ]).isRequired
};
NavTab.defaultProps = {
  onlyActiveOnIndex: false
};
NavTab.contextTypes = {
  history: React.PropTypes.object
};
