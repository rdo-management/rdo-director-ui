import { fromJS, List, Map } from 'immutable';
import { normalize, arrayOf } from 'normalizr';
import when from 'when';

import * as utils from '../../js/services/utils';
import { Plan } from '../../js/immutableRecords/plans';
import { planSchema } from '../../js/normalizrSchemas/plans';
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

    it('`conflict` is undefined', () => {
      expect(state.get('conflict')).not.toBeDefined();
    });

    it('`currentPlanName` is undefined', () => {
      expect(state.get('currentPlanName')).not.toBeDefined();
    });

    it('`all` is empty', () => {
      expect(state.get('all').size).toEqual(0);
    });
  });

  describe('PLAN_CHOSEN', () => {
    let state;

    beforeEach(() => {
      state = plansReducer(
        Map({
          currentPlanName: undefined,
          all: List.of(...['overcloud', 'another-cloud'])
        }),
        PlansActions.planChosen('another-cloud')
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
        PlansActions.receivePlans(normalize([
          { name: 'overcloud' },
          { name: 'another-cloud' }
        ], arrayOf(planSchema)))
      );
    });

    it('sets `isFetchingPlans` to false', () => {
      expect(state.get('isFetchingPlans')).toBe(false);
    });

    it('sets `all` to a list of Plan records', () => {
      expect(state.get('all').size).toEqual(2);
      state.get('all').forEach(item => {
        expect(item instanceof Plan).toBe(true);
      });
    });
  });

  describe('RECEIVE_PLAN', () => {
    let state, plan;

    beforeEach(() => {
      state = plansReducer(
        Map({
          all: List.of(
            new Plan({name: 'some-cloud' }),
            new Plan({name: 'overcloud' })
          )
        }),
        PlansActions.receivePlan({
          name: 'overcloud',
          files: {
            'capabilities_map.yaml': {
              contents: 'foo',
              meta: { 'file-type': 'capabilities-map' }
            },
            'foo.yaml': {
              contents: 'bar'
            }
          }
        })
      );
      plan = state.get('all').filter(plan => plan.get('name') === 'overcloud').first();
    });

    it('updates the plan records `files` attributes', () => {
      expect(List.isList(plan.get('files'))).toBe(true);
      expect(plan.get('files').size).toEqual(2);
    });
  });

  describe('Plan deletion', () => {
    let state = Map({
      all: fromJS([
        new Plan({ name: 'overcloud' }),
        new Plan({ name: 'somecloud' })
      ])
    });
    let newState;

    it('DELETING_PLAN sets `isDeleting` in plan Record to true', () => {
      newState = plansReducer(
        state,
        PlansActions.deletingPlan('somecloud')
      );
      let plan = newState.get('all').filter(item => item.get('name') === 'somecloud').first();
      expect(plan.get('isDeleting')).toBe(true);
    });

    it('PLAN_DELETED sets `isDeleting` in plan Record to false', () => {
      newState = plansReducer(
        newState,
        PlansActions.planDeleted('somecloud')
      );
      let plan = newState.get('all').filter(item => item.get('name') === 'somecloud').first();
      expect(plan.get('isDeleting')).toBe(false);
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
      expect(PlansActions.updatingPlan).toHaveBeenCalledWith('somecloud');
    });

    it('dispatches planUpdated', () => {
      expect(PlansActions.planUpdated).toHaveBeenCalledWith('somecloud');
    });

    it('dispatches fetchPlans', () => {
      expect(PlansActions.fetchPlans).toHaveBeenCalled();
    });
  });

  describe('createPlan', () => {
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
      expect(PlansActions.planDeleted).toHaveBeenCalledWith('somecloud');
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
      let expected = {
        result: ['overcloud', 'another-cloud'],
        entities: {
          plan: {
            'overcloud': { name: 'overcloud' },
            'another-cloud': { name: 'another-cloud' }
          }
        }
      };
      expect(PlansActions.receivePlans).toHaveBeenCalledWith(expected);
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
