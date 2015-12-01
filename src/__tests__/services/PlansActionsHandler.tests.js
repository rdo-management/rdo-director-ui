import NotificationActions from '../../js/actions/NotificationActions';
import PlansActionsHandler from '../../js/services/PlansActionsHandler';
import PlansActions from '../../js/actions/PlansActions';
import PlansStore from '../../js/stores/PlansStore';

describe('PlansActionsHandler.onChoosePlan', () => {
  it('saves the new plan name in localStorage', () => {
    spyOn(window.localStorage, 'setItem');
    PlansStore.state = {
      currentPlanName: 'some-plan',
      planNames: []
    };
    PlansActionsHandler.onChoosePlan();
    expect(window.localStorage.setItem).toHaveBeenCalledWith('currentPlanName', 'some-plan');
  });
});

describe('PlansActionsHandler.onListPlans', () => {
  beforeEach(() => {
    spyOn(PlansActions, 'choosePlan');
    spyOn(NotificationActions, 'notify');
    spyOn(window.localStorage, 'setItem');
    PlansStore.state = {
      currentPlanName: undefined,
      planNames: []
    };
  });

  it('activates the plan in localStorage if there is none in state', () => {
    spyOn(window.localStorage, 'getItem').and.returnValue('plan-2');
    PlansStore.state.planNames = ['plan-1', 'plan-2'];
    PlansActionsHandler.onListPlans();
    expect(PlansActions.choosePlan).toHaveBeenCalledWith('plan-2');
    expect(window.localStorage.setItem).not.toHaveBeenCalled();
  });

  it('activates the first plan if none is chosen', () => {
    PlansStore.state.planNames = ['plan-1', 'plan-2'];
    spyOn(window.localStorage, 'getItem').and.returnValue(null);
    PlansActionsHandler.onListPlans();
    expect(PlansActions.choosePlan).toHaveBeenCalledWith('plan-1');
    expect(window.localStorage.setItem).toHaveBeenCalledWith('currentPlanName', 'plan-1');
  });

  it('activates the first existing plan if plan in state does not exist.', () => {
    PlansStore.state.currentPlanName = 'no-match';
    PlansStore.state.planNames = ['plan-1', 'plan-2'];
    PlansActionsHandler.onListPlans();
    expect(PlansActions.choosePlan).toHaveBeenCalledWith('plan-1');
    expect(NotificationActions.notify).toHaveBeenCalled();
    expect(window.localStorage.setItem).toHaveBeenCalledWith('currentPlanName', 'plan-1');
  });

  it('activates the first existing plan if plan in localStorage does not exist.', () => {
    spyOn(window.localStorage, 'getItem').and.returnValue('no-match');
    PlansStore.state.planNames = ['plan-1', 'plan-2'];
    PlansActionsHandler.onListPlans();
    expect(PlansActions.choosePlan).toHaveBeenCalledWith('plan-1');
    expect(NotificationActions.notify).toHaveBeenCalled();
    expect(window.localStorage.setItem).toHaveBeenCalledWith('currentPlanName', 'plan-1');
  });

  it('does not try to choose a plan if there is none', () => {
    spyOn(window.localStorage, 'getItem').and.returnValue(null);
    PlansActionsHandler.onListPlans();
    expect(PlansActions.choosePlan).not.toHaveBeenCalled();
    expect(window.localStorage.setItem).not.toHaveBeenCalled();
  });

  it('does not try to choose a plan if there is one that is active', () => {
    PlansStore.state.currentPlanName = 'plan-1';
    PlansStore.state.planNames = ['plan-1', 'plan-2'];
    expect(PlansActions.choosePlan).not.toHaveBeenCalled();
    expect(window.localStorage.setItem).not.toHaveBeenCalled();
  });

});
