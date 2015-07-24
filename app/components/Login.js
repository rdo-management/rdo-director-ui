import React from 'react/addons';
import ReactMixin from 'react-mixin';

export default class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      'username': '',
      'password': ''
    }
  }

  handleLogin(e) {
    e.preventDefault();
    console.log("Submitted");
    console.log(this.state.username);
    console.log(this.state.password);
    // Auth.login(this.state.username, this.state.password)
    //   .catch(function(err){
    //     console.log("Error logging in", err);
    //   });
  }

  render() {
    return (
      <form role="form" onSubmit={this.handleLogin.bind(this)}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" className="form-control" id="username" valueLink={this.linkState('username')} placeholder="Username" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" valueLink={this.linkState('password')} placeholder="Password" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    );
  }
}

ReactMixin(Login.prototype, React.addons.LinkedStateMixin);
