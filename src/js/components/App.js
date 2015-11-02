import ClassNames from 'classnames';
import React from 'react';

import NavBar from './NavBar';
import Footer from './Footer';
import NotificationList from './ui/NotificationList';

export default class App extends React.Component {
  render() {
    let containerClass = ClassNames({
      'rdo-body': true,
      'rdo-fixed-body': this.props.children.type.name != 'Login'
    });

    return (
    <div className="pf-framework">
      <header className="pf-framework-header">
        <NavBar/>
      </header>
      <div className={containerClass} id="centralPanel">
        <NotificationList/>
        <div className="pf-framework-content">
          {this.props.children}
        </div>
      </div>
      <Footer/>
    </div>
    );
  }
}
App.propTypes = {
  children: React.PropTypes.element
};
