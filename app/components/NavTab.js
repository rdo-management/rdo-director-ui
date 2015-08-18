import React from 'react';
import * as Router from 'react-router';

let Link = Router.Link;

export default class NavTab extends Link {
  render() {
    let router = this.context.router;
    let isActive = router.isActive(this.props.to, this.props.params, this.props.query);
    let className = isActive ? 'active' : '';
    let link = (
      <Link {...this.props} />
    );
    return <li className={className}>{link}</li>;
  }
}
NavTab.propTypes = {
  params: React.PropTypes.object,
  query: React.PropTypes.object,
  to: React.PropTypes.oneOfType([ React.PropTypes.string, React.PropTypes.route ]).isRequired
};
NavTab.contextTypes = {
  router: React.PropTypes.func
};
