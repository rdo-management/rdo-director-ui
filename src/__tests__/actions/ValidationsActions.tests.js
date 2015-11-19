const AppDispatcher = require('../../js/dispatchers/AppDispatcher');
const ValidationsActions = require('../../js/actions/ValidationsActions');
const ValidationsConstants = require('../../js/constants/ValidationsConstants');

let mockGetStagesResponse = [
  { uuid: 1 },
  { uuid: 2 }
];

describe('ValidationsActions', () => {
  it('creates action to list validation stages', () => {
    spyOn(AppDispatcher, 'dispatch').and.callThrough();
    ValidationsActions.listStages(mockGetStagesResponse);
    expect(AppDispatcher.dispatch).toHaveBeenCalledWith({
      actionType: ValidationsConstants.LIST_STAGES,
      stages: mockGetStagesResponse
    });
  });
});
