import React from 'react/addons';
import ReactMixin from 'react-mixin';

import LoginActions from '../actions/LoginActions';
import LoginStore from '../stores/LoginStore';

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = LoginStore.getState();
  }

  componentDidMount() {
    LoginStore.addChangeListener(this._onChange.bind(this));
    this.setState(LoginStore.getState());
  }

  componentWillUnmount() {
    LoginStore.removeChangeListener(this._onChange.bind(this));
  }

  _onChange() {
    this.setState(LoginStore.getState());
    if (LoginStore.isLoggedIn()) {
      this.context.router.transitionTo('overview');
    }
  }

  handleLogin(e) {
    e.preventDefault();
    LoginActions.authenticateUser(this.state.username, this.state.password);
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-6 col-xs-8 col-md-offset-3 col-xs-offset-2">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h1 className="panel-title">Login</h1>
            </div>
            <div className="panel-body">
              <form role="form" onSubmit={this.handleLogin.bind(this)}>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input type="text" className="form-control"
                         id="username" valueLink={this.linkState('username')}
                         placeholder="Username" />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" className="form-control" id="password"
                         valueLink={this.linkState('password')}
                         placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Login.contextTypes = {
  router: React.PropTypes.func
};

ReactMixin(Login.prototype, React.addons.LinkedStateMixin);
