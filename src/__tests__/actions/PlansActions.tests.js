import { List, Map } from 'immutable';

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

  fdescribe('RECEIVE_PLANSLIST', () => {
    let state;

    beforeEach(() => {
      state = plansReducer(Map({
        isFetching: true,
        all: List()
      }), {
        type: PlansConstants.RECEIVE_PLANSLIST,
        payload: { plans: [
          { name: 'overcloud' },
          { name: 'another-cloud' }
        ]}
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

xdescribe('PlansActions', () => {
});
