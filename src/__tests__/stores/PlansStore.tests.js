import PlansConstants from '../../js/constants/PlansConstants';
import PlansStore from '../../js/stores/PlansStore';

describe('PlansStore', () => {
  xit('should call onListPlans on LIST_PLANS action', () => {
    spyOn(PlansStore, 'onListPlans').and.callThrough();
    let payload = { actionType: PlansConstants.LIST_PLANS,
                plans: [ 'p1', 'p2'] };
    PlansStore._registerToActions(payload);
    expect(PlansStore.onListPlans).toHaveBeenCalledWith(payload.plans);
    expect(PlansStore.state.plans).toEqual(payload.plans);
  });

  describe('.onListPlans(plans)', () => {
    let newPlans = [{name: 'plan-1'}, {name: 'plan-2'}];

    it('updates state.plans', () => {
      PlansStore.onListPlans(newPlans);
      expect(PlansStore.state.plans).toEqual([{name: 'plan-1'}, {name: 'plan-2'}]);
    });
  });

  describe('.onGetPlan', () => {
    beforeEach(() => {
      PlansStore.state = {
        currentPlanName: undefined,
        plans: []
      };
    });

    it('updates the state', () => {
      PlansStore.onGetPlan('new-plan');
      expect(PlansStore.state.currentPlanName).toEqual('new-plan');
    });
  });
});

describe('PlansStore plan detection', () => {
  beforeEach(() => {
    spyOn(window.localStorage, 'setItem');
    PlansStore.state = {
      currentPlanName: undefined,
      plans: [],
      conflict: undefined
    };
  });

  it('saves the new plan name in localStorage', () => {
    PlansStore.state = {
      currentPlanName: undefined,
      plans: []
    };
    PlansStore.onGetPlan('some-plan');
    expect(window.localStorage.setItem).toHaveBeenCalledWith('currentPlanName', 'some-plan');
  });

  it('activates the plan in localStorage if there is none in state', () => {
    spyOn(window.localStorage, 'getItem').and.returnValue('plan-2');
    PlansStore.onListPlans([{name: 'plan-1'}, {name: 'plan-2'}]);
    expect(PlansStore.state.currentPlanName).toBe('plan-2');
    expect(window.localStorage.setItem).toHaveBeenCalledWith('currentPlanName', 'plan-2');
  });

  it('activates the first existing plan if plan in state does not exist.', () => {
    PlansStore.state.currentPlanName = 'no-match';
    PlansStore.onListPlans([{name: 'plan-1'}, {name: 'plan-2'}]);
    expect(PlansStore.state.currentPlanName).toBe('plan-1');
    expect(PlansStore.state.conflict).toBe('no-match');
    expect(window.localStorage.setItem).toHaveBeenCalledWith('currentPlanName', 'plan-1');
  });

  it('does not try to choose a plan if there is none', () => {
    spyOn(window.localStorage, 'getItem').and.returnValue(null);
    PlansStore.onListPlans([]);
    expect(PlansStore.state.currentPlanName).not.toBeDefined();
    expect(PlansStore.state.conflict).not.toBeDefined();
    expect(window.localStorage.setItem).not.toHaveBeenCalled();
  });
});
