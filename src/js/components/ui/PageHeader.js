import React from 'react';


export class PageHeader extends React.Component {
  render() {
    return (
      <div className="page-header">
        <h1>{this.props.children}</h1>
      </div>
    );
  }
}
PageHeader.propTypes = {
  'children': React.PropTypes.node
};
