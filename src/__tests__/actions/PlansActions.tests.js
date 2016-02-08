import { List, Map } from 'immutable';
import when from 'when';

import TripleOApiService from '../../js/services/TripleOApiService';

const PlansActions = require('../../js/actions/PlansActions');
const plansReducer = require('../../js/reducers/plansReducer');

describe('plansReducer default state', () => {
  describe('default state', () => {
    let state;

    beforeEach(() => {
      state = plansReducer(undefined, {type: 'undefined-action'});
    });

    it('`isFetchingPlans` is false', () => {
      expect(state.get('isFetchingPlans')).toBe(false);
    });

    it('`isFetchingPlan` is false', () => {
      expect(state.get('isFetchingPlan')).toBe(false);
    });

    it('`isDeletingPlan` is false', () => {
      expect(state.get('isDeletingPlan')).toBe(false);
    });

    it('`conflict` is undefined', () => {
      expect(state.get('conflict')).not.toBeDefined();
    });

    it('`currentPlanName` is undefined', () => {
      expect(state.get('currentPlanName')).not.toBeDefined();
    });

    it('`planData` is defined', () => {
      expect(state.get('planData').size).toBeDefined();
    });

    it('`all` is empty', () => {
      expect(state.get('all').size).toEqual(0);
    });
  });

  describe('CHOOSE_PLAN', () => {
    let state;

    beforeEach(() => {
      state = plansReducer(
        Map({
          currentPlanName: undefined,
          all: List.of(...['overcloud', 'another-cloud'])
        }),
        PlansActions.choosePlan('another-cloud')
      );
    });

    it('sets the current planName', () => {
      expect(state.get('currentPlanName')).toEqual('another-cloud');
    });
  });

  describe('REQUEST_PLANSLIST', () => {
    let state;

    beforeEach(() => {
      state = plansReducer(
        Map({ isFetchingPlans: false }),
        PlansActions.requestPlans()
      );
    });

    it('sets `isFetchingPlans` to true', () => {
      expect(state.get('isFetchingPlans')).toBe(true);
    });
  });

  describe('RECEIVE_PLANSLIST', () => {
    let state;

    beforeEach(() => {
      state = plansReducer(
        Map({
          isFetchingPlans: true,
          all: List()
        }),
        PlansActions.receivePlans([
          { name: 'overcloud' },
          { name: 'another-cloud' }
        ])
      );
    });

    it('sets `isFetchingPlans` to false', () => {
      expect(state.get('isFetchingPlans')).toBe(false);
    });

    it('sets `all` to a list of plan names', () => {
      expect(state.get('all')).toEqual(List.of(...['another-cloud', 'overcloud']));
    });
  });

  describe('REQUEST_PLAN', () => {
    let state;

    beforeEach(() => {
      state = plansReducer(
        Map({ isFetchingPlan: false }),
        PlansActions.requestPlan());
    });

    it('sets `isFetchingPlan` to true', () => {
      expect(state.get('isFetchingPlan')).toBe(true);
    });
  });

  describe('RECEIVE_PLAN', () => {
    let state;

    beforeEach(() => {
      state = plansReducer(
        undefined,
        PlansActions.receivePlan({ name: 'overcloud' }));
    });

    it('sets `isFetchingPlan` to false', () => {
      expect(state.get('isFetchingPlan')).toBe(false);
    });

    it('updates `planData`', () => {
      expect(state.get('planData').get('overcloud').name).toBe('overcloud');
    });
  });
});

// Use this to mock asynchronous functions which return a promise.
// The promise will immediately resolve with `data`.
let createResolvingPromise = (data) => {
  return () => {
    return when.resolve(data);
  };
};

describe('PlansActions', () => {
  describe('fetchPlans', () => {
    let apiResponse = {
      plans: [
        { name: 'overcloud' },
        { name: 'another-cloud' }
      ]
    };

    beforeEach(done => {
      spyOn(PlansActions, 'requestPlans');
      spyOn(PlansActions, 'receivePlans');
      // Mock the service call.
      spyOn(TripleOApiService, 'getPlans').and.callFake(createResolvingPromise(apiResponse));
      // Call the action creator and the resulting action.
      // In this case, dispatch and getState are just empty placeHolders.
      PlansActions.fetchPlans()(() => {}, () => {});
      // Call done with a minimal timeout.
      setTimeout(() => { done(); }, 1);
    });

    it('dispatches requestPlans', () => {
      expect(PlansActions.requestPlans).toHaveBeenCalled();
    });

    it('dispatches receivePlans', () => {
      expect(PlansActions.receivePlans).toHaveBeenCalledWith(apiResponse.plans);
    });
  });

  describe('fetchPlan', () => {
    let apiResponse = {
      plan: {
        name: 'overcloud',
        files: {
          'overcloud.yaml': {
            contents: 'heat_template_version: 2015-04-30\n'
          },
          'capabilities_map.yaml': {
            contents: 'root_template: overcloud.yaml\n',
            meta: {
              'file-type': 'capabilities-map'
            }
          }
        }
      }
    };

    beforeEach(done => {
      spyOn(TripleOApiService, 'getPlan').and.callFake(createResolvingPromise(apiResponse));
      spyOn(PlansActions, 'requestPlan');
      spyOn(PlansActions, 'receivePlan');
      PlansActions.fetchPlan('overcloud')(() => {}, () => {});
      setTimeout(() => { done(); }, 1);
    });

    it('dispatches requestPlan', () => {
      expect(PlansActions.requestPlan).toHaveBeenCalled();
    });

    it('dispatches receivePlan', () => {
      expect(PlansActions.receivePlan).toHaveBeenCalledWith(apiResponse.plan);
    });

  });
});

