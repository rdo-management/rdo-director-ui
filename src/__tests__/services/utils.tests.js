import { InitialLoginState } from '../../js/immutableRecords/login';
import matchers from 'jasmine-immutable-matchers';
import { List, Map } from 'immutable';
import store from '../../js/store';

import { getServiceUrl, getAuthTokenId } from '../../js/services/utils';

describe('utility functions', () => {
  const appState = {
    login: new InitialLoginState({
      keystoneAccess: Map({
        token: Map({
          id: 123456
        }),
        serviceCatalog: List([
          Map({
            name: 'nova',
            endpoints: List([
              Map({
                adminURL: 'http://someNovaAdminUrl'
              })
            ])
          })
        ])
      }),
      loginForm: Map({
        formErrors: List(),
        formFieldErrors: Map()
      }),
      authInProgress: false
    })
  };

  beforeEach(() => {
    jasmine.addMatchers(matchers);
    spyOn(store, 'getState').and.returnValue(appState);
  });

  it('provides function to retrieve OpenStack service URL from login state', () => {
    expect(getServiceUrl('nova')).toEqual('http://someNovaAdminUrl');
  });

  it('provides function to retrieve Keystone Auth Token ID from login state', () => {
    expect(getAuthTokenId()).toEqual(123456);
  });
});
