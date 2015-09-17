const AuthTokenStorage = require('../../js/services/AuthTokenStorage.js');
const LoginActions = require('../../js/actions/LoginActions');

describe('AuthTokenStorage.', () => {

    describe('```AuthTokenStorage.getTokenId```', () => {

        let cbObj = { cb: (token) => {} };

        beforeEach(() => {
            spyOn(cbObj, 'cb');
        });

        it('calls the given callback with the token if one has been set.',
                (done) => {
            LoginActions.loginUser({
                token: 'token-from-login',
                user: null,
                serviceCatalog: null,
                metadata: null
            });
            // unset the sessionStorage value to make sure
            // the value is retreived from the worker.
            spyOn(sessionStorage, 'getItem').and.returnValue(null);
            AuthTokenStorage.getTokenId(cbObj.cb);
            done();
            expect(cbObj.cb).toHaveBeenCalledWith('token-from-login');
        });

        it('gives precedence to the token in sessionStorage if one is set', () => {
            spyOn(sessionStorage, 'getItem').and.returnValue('token-from-session-storage');
            AuthTokenStorage.getTokenId(cbObj.cb);
            expect(cbObj.cb).toHaveBeenCalledWith('token-from-session-storage');
        });

    });

    describe('```AuthTokenStorage.onLogoutUser```', () => {

        it('removes the token from sessionStorage', () => {
            spyOn(sessionStorage, 'removeItem');
            AuthTokenStorage.removeTokenId();
            expect(sessionStorage.removeItem).toHaveBeenCalledWith('keystoneAuthTokenId');
        });

    });
    
});
