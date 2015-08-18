import React from 'react';

import AuthenticatedComponent from './AuthenticatedComponent';
import FlavorStore from '../stores/FlavorStore';
import { PageHeader } from './Layout';


export default AuthenticatedComponent(class Nodes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flavors: []
    };
  }

  componentDidMount() {
    this.setState(FlavorStore.getState());
    FlavorStore.addChangeListener(this._onChange.bind(this));
  }

  componentWillUnmount() {
    FlavorStore.removeChangeListener(this._onChange.bind(this));
  }

  _onChange() {
    this.setState(FlavorStore.getState());
  }

  render() {
    return (
      <div className="row">
        <PageHeader>Nodes</PageHeader>
      </div>
    );
  }
});
