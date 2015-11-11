const AppDispatcher = require('../../js/dispatchers/AppDispatcher');
const ValidationsActions = require('../../js/actions/ValidationsActions');
const ValidationsConstants = require('../../js/constants/ValidationsConstants');

let mockGetValidationsResponse = [
  { uuid: 1 },
  { uuid: 2 }
];

describe('ValidationsActions', () => {
  it('creates action to list validations', () => {
    spyOn(AppDispatcher, 'dispatch').and.callThrough();
    ValidationsActions.listValidations(mockGetValidationsResponse);
    expect(AppDispatcher.dispatch).toHaveBeenCalledWith({
      actionType: ValidationsConstants.LIST_VALIDATIONS,
      validations: mockGetValidationsResponse
    });
  });
});
