import PlansConstants from '../../js/constants/PlansConstants';
import PlansStore from '../../js/stores/PlansStore';

xdescribe('Plans Store', () => {
  it('should call onListPlans on LIST_PLANS action', () => {
    spyOn(PlansStore, 'onListPlans').and.callThrough();
    let payload = { actionType: PlansConstants.LIST_PLANS,
                plans: [ 'p1', 'p2'] };
    PlansStore._registerToActions(payload);
    expect(PlansStore.onListPlans).toHaveBeenCalledWith(payload.plans);
    expect(PlansStore.state.plans).toEqual(payload.plans);
  });
});
