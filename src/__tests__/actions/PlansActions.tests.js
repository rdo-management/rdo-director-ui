import { List, Map } from 'immutable';
import when from 'when';

import TripleOApiService from '../../js/services/TripleOApiService';

const AppDispatcher = require('../../js/dispatchers/AppDispatcher');
const PlansActions = require('../../js/actions/PlansActions');
const PlansConstants = require('../../js/constants/PlansConstants');
const plansReducer = require('../../js/reducers/plansReducer');

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

let createResolvingPromise = (data) => {
  return () => {
    return when.resolve(data);
  };
};

describe('PlansActions', () => {
  describe('fetchPlanslist on success', () => {
    let apiResponse = {
      plans: [
        { name: 'overcloud' },
        { name: 'another-cloud' }
      ]
    };

    beforeEach(done => {
      spyOn(PlansActions, 'requestPlanslist');
      spyOn(PlansActions, 'receivePlanslist');
      // Mock the service call.
      spyOn(TripleOApiService, 'getPlans').and.callFake(createResolvingPromise(apiResponse));
      // Call the action creator and the resulting action.
      // In this case, dispatch and getState are just empty placeHolders.
      PlansActions.fetchPlanslist()(() => {}, () => {});
      // Call done with a minimal timeout.
      setTimeout(() => { done(); }, 1);
    });

    it('dispatches requestPlanslist', () => {
      expect(PlansActions.requestPlanslist).toHaveBeenCalled();
    });

    it('dispatches receivePlanslist', () => {
      expect(PlansActions.receivePlanslist).toHaveBeenCalledWith(apiResponse.plans);
    });

  });
});
