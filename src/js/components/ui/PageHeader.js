import React from 'react';


export class PageHeader extends React.Component {
  render() {
    return (
      <div className="page-header">
        <div>{this.props.children}</div>
      </div>
    );
  }
}
PageHeader.propTypes = {
  children: React.PropTypes.node
};
