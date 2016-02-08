import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { List, Map } from 'immutable';

import createMockStoreDone from '../utils/createMockStoreDone';

const AppDispatcher = require('../../js/dispatchers/AppDispatcher');
const PlansActions = require('../../js/actions/PlansActions');
const PlansConstants = require('../../js/constants/PlansConstants');
const plansReducer = require('../../js/reducers/plansReducer');

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('plansReducer', () => {
  describe('default state', () => {
    let state;

    beforeEach(() => {
      state = plansReducer(undefined, {type: 'unexpected-type'});
    });

    it('`isFetching` is false', () => {
      expect(state.get('isFetching')).toBe(false);
    });

    it('`conflict` is undefined', () => {
      expect(state.get('conflict')).not.toBeDefined();
    });

    it('`currentPlanName` is undefined', () => {
      expect(state.get('currentPlanName')).not.toBeDefined();
    });

    it('`currentPlanFiles` is empty', () => {
      expect(state.get('currentPlanFiles').size).toEqual(0);
    });

    it('`all` is empty', () => {
      expect(state.get('all').size).toEqual(0);
    });
  });

  describe('REQUEST_PLANSLIST', () => {
    let state;

    beforeEach(() => {
      state = plansReducer(Map({ isFetching: false }), {
        type: PlansConstants.REQUEST_PLANSLIST
      });
    });

    it('sets `isFetching` to true', () => {
      expect(state.get('isFetching')).toBe(true);
    });
  });

  describe('RECEIVE_PLANSLIST', () => {
    let state;

    beforeEach(() => {
      state = plansReducer(Map({
        isFetching: true,
        all: List()
      }), {
        type: PlansConstants.RECEIVE_PLANSLIST,
        payload: [
          { name: 'overcloud' },
          { name: 'another-cloud' }
        ]
      });
    });

    it('sets `isFetching` to false', () => {
      expect(state.get('isFetching')).toBe(false);
    });

    it('sets `all` to a list of plan names', () => {
      expect(state.get('all')).toEqual(List.of(...['another-cloud', 'overcloud']));
    });
  });
});

describe('PlansActions', () => {

  afterEach(() => {
    nock.cleanAll();
  });

  describe('fetchPlanslist', () => {

    it('fetches plans from the API', done => {
      nock(/.*:8585/)
        .get(uri => { console.log(uri); return true;})
        .reply(200, {
          plans: [
            { name: 'overcloud' },
            { name: 'another-cloud' }
          ]
        });

      const store = mockStore(
        { plans: [] },
        [
          { type: PlansConstants.REQUEST_PLANSLIST },
          { type: PlansConstants.RECEIVE_PLANSLIST, payload: [] }
        ],
        createMockStoreDone(done)
      );
      store.dispatch(PlansActions.fetchPlanslist());
    });

  });
});
