const AppDispatcher = require('../../js/dispatchers/AppDispatcher');
const PlansActions = require('../../js/actions/PlansActions');
const PlansConstants = require('../../js/constants/PlansConstants');

let mockGetPlansResponse = [
  { uuid: 1 },
  { uuid: 2 }
];

describe('PlansActions', () => {
  xit('creates action to list plans', () => {
    spyOn(AppDispatcher, 'dispatch').and.callThrough();
    PlansActions.listPlans(mockGetPlansResponse);
    expect(AppDispatcher.dispatch).toHaveBeenCalledWith({
      actionType: PlansConstants.LIST_PLANS,
      plans: mockGetPlansResponse
    });
  });
});
