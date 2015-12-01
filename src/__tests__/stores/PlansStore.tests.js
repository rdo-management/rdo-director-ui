import PlansActions from '../../js/actions/PlansActions';
import PlansConstants from '../../js/constants/PlansConstants';
import PlansStore from '../../js/stores/PlansStore';

describe('Plans Store', () => {
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

    it('updates state.planNames', () => {
      PlansStore.onListPlans(newPlans);
      expect(PlansStore.state.planNames).toEqual(['plan-1', 'plan-2']);
    });

    describe('(if currentPlanName is neither in state or localStorage)', () => {
      beforeEach(() => {
        PlansStore.state = {
          currentPlanName: undefined,
          planNames: []
        }
      });

      it('chooses the first name from the list and sets it in state and localStorage', () => {
        PlansStore.onListPlans(newPlans);
        expect(PlansStore.state.currentPlanName).toEqual('plan-1');
      });
    });

    describe('(if currentPlanName is set in state)', () => {
      it('sets currentPlanName in localStorage if it matches planNames', () => {
        spyOn(window.localStorage, 'setItem');
        PlansStore.state.currentPlanName = 'plan-2';
        PlansStore.onListPlans(newPlans);
        expect(PlansStore.state.currentPlanName).toEqual('plan-2');
        expect(window.localStorage.setItem).toHaveBeenCalledWith('currentPlanName', 'plan-2');
      });

      it('sets currentPlanName to undefined in state if it does not match planNames', () => {
        PlansStore.state.currentPlanName = 'no-match';
        spyOn(window.localStorage, 'setItem');
        PlansStore.onListPlans(newPlans);
        expect(PlansStore.state.currentPlanName).not.toBeDefined();
        expect(window.localStorage.setItem).not.toHaveBeenCalled();
      });
    });

    describe('(if currentPlanName is not set in state, but in localStorage)', () => {
      it('sets currentPlanName in state if it matches planNames', () => {
        PlansStore.state.currentPlanName = undefined;
        spyOn(window.localStorage, 'getItem').and.returnValue('plan-1');
        PlansStore.onListPlans(newPlans);
        expect(PlansStore.state.currentPlanName).toEqual('plan-1');
      });

      it('does not do anything if there is no match in planNames', () => {
        PlansStore.state.currentPlanName = undefined;
        spyOn(window.localStorage, 'getItem').and.returnValue('no-match');
        spyOn(window.localStorage, 'setItem');
        PlansStore.onListPlans(newPlans);
        expect(PlansStore.state.currentPlanName).not.toBeDefined();
        expect(window.localStorage.setItem).not.toHaveBeenCalled();
      });
    });
  });

  describe('.onGetPlan', () => {
    beforeEach(() => {
      spyOn(window.localStorage, 'setItem');
      PlansStore.state = {
        currentPlanName: undefined,
        planNames: []
      }
    });

    it('updates the state', () => {
      PlansStore.onGetPlan('new-plan');
      expect(PlansStore.state.currentPlanName).toEqual('new-plan');
      expect(window.localStorage.setItem).toHaveBeenCalledWith('currentPlanName', 'new-plan');
    });
  });
});
