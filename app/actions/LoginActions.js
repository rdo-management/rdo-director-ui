import AppDispatcher from '../dispatchers/AppDispatcher.js';
import AuthService from '../services/AuthService';

export default {
  authenticateUser: function(username, password) {
    AppDispatcher.dispatch({
      actionType: "USER_AUTH_STARTED"
    }); //we should show loading spinner to the user

    console.log("authenticateAction actually happened.");
    // AuthService.login(username, password)
    //   .catch(function(err){
    //     console.log("Error logging in", err);
    //   });

    // Now when the user is be authenticated, log him in
    this.loginUser();
  },

  loginUser: function() {
    console.log("Login user action has started");
    AppDispatcher.dispatch({
      actionType: "LOGIN_USER"
    });
  }
}
