import { List, Map } from 'immutable';
import when from 'when';

import TripleOApiService from '../../js/services/TripleOApiService';
import * as utils from '../../js/services/utils';

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

    it('`currentPlanFiles` is defined', () => {
      expect(state.get('currentPlanFiles').size).toBeDefined();
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
        PlansActions.receivePlan({ name: 'overcloud', files: {}}));
    });

    it('sets `isFetchingPlan` to false', () => {
      expect(state.get('isFetchingPlan')).toBe(false);
    });

    it('updates `currentPlanFiles`', () => {
      expect(state.get('currentPlanFiles')).toEqual(Map());
    });
  });

  describe('Plan deletion', () => {
    let state;

    it('DELETING_PLAN sets `isDeletingPlan` to a plan name', () => {
      state = plansReducer(
        undefined,
        PlansActions.deletingPlan('somecloud')
      );
      expect(state.get('isDeletingPlan')).toBe('somecloud');
    });

    it('PLAN_DETECTED sets `isDeletingPlan` to false', () => {
      state = plansReducer(
        Map({isDeletingPlan: 'somecloud'}),
        PlansActions.planDeleted('somecloud')
      );
      expect(state.get('isDeletingPlan')).toBe(false);
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
  beforeEach(() => {
    spyOn(utils, 'getAuthTokenId').and.returnValue('mock-auth-token');
  });

  describe('updatePlan', () => {
    beforeEach(done => {
      spyOn(PlansActions, 'updatingPlan');
      spyOn(PlansActions, 'planUpdated');
      spyOn(PlansActions, 'fetchPlans');
      // Mock the service call.
      spyOn(TripleOApiService, 'updatePlan').and.callFake(createResolvingPromise());
      // Call the action creator and the resulting action.
      // In this case, dispatch and getState are just empty placeHolders.
      PlansActions.updatePlan('somecloud', {})(() => {}, () => {});
      // Call done with a minimal timeout.
      setTimeout(() => { done(); }, 1);
    });

    it('dispatches updatingPlan', () => {
      expect(PlansActions.updatingPlan).toHaveBeenCalled();
    });

    it('dispatches planUpdated', () => {
      expect(PlansActions.planUpdated).toHaveBeenCalled();
    });

    it('dispatches fetchPlans', () => {
      expect(PlansActions.fetchPlans).toHaveBeenCalled();
    });
  });

  describe('crutils', () => {
    beforeEach(done => {
      spyOn(PlansActions, 'creatingPlan');
      spyOn(PlansActions, 'planCreated');
      spyOn(PlansActions, 'fetchPlans');
      // Mock the service call.
      spyOn(TripleOApiService, 'createPlan').and.callFake(createResolvingPromise());
      // Call the action creator and the resulting action.
      // In this case, dispatch and getState are just empty placeHolders.
      PlansActions.createPlan('somecloud', {})(() => {}, () => {});
      // Call done with a minimal timeout.
      setTimeout(() => { done(); }, 1);
    });

    it('dispatches creatingPlan', () => {
      expect(PlansActions.creatingPlan).toHaveBeenCalled();
    });

    it('dispatches planCreated', () => {
      expect(PlansActions.planCreated).toHaveBeenCalled();
    });

    it('dispatches fetchPlans', () => {
      expect(PlansActions.fetchPlans).toHaveBeenCalled();
    });
  });

  describe('deletePlans', () => {
    beforeEach(done => {
      spyOn(PlansActions, 'deletingPlan');
      spyOn(PlansActions, 'planDeleted');
      spyOn(PlansActions, 'fetchPlans');
      // Mock the service call.
      spyOn(TripleOApiService, 'deletePlan').and.callFake(createResolvingPromise());
      // Call the action creator and the resulting action.
      // In this case, dispatch and getState are just empty placeHolders.
      PlansActions.deletePlan('somecloud')(() => {}, () => {});
      // Call done with a minimal timeout.
      setTimeout(() => { done(); }, 1);
    });

    it('dispatches deletingPlan', () => {
      expect(PlansActions.deletingPlan).toHaveBeenCalledWith('somecloud');
    });

    it('dispatches planDeleted', () => {
      expect(PlansActions.planDeleted).toHaveBeenCalled();
    });

    it('dispatches fetchPlans', () => {
      expect(PlansActions.fetchPlans).toHaveBeenCalled();
    });
  });

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
