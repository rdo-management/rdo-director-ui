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
  });

  describe('.onGetPlan', () => {
    beforeEach(() => {
      PlansStore.state = {
        currentPlanName: undefined,
        planNames: []
      };
    });

    it('updates the state', () => {
      PlansStore.onGetPlan('new-plan');
      expect(PlansStore.state.currentPlanName).toEqual('new-plan');
    });
  });
});
