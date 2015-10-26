import ClassNames from 'classnames';
import React from 'react';

import NavBar from './NavBar';
import NotificationList from './ui/NotificationList';

export default class App extends React.Component {
  render() {
    let containerClass = ClassNames({
      'container': this.props.children.type.name === 'Login',
      'container-fluid': this.props.children.type.name != 'Login'
    });
    return (
      <div>
        <NotificationList/>
        <NavBar/>
        <div className={containerClass}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
App.propTypes = {
  children: React.PropTypes.element
};
