import ValidationsConstants from '../../js/constants/ValidationsConstants';
import ValidationsStore from '../../js/stores/ValidationsStore';

describe('Validations Store', () => {
  it('should call onListValidations on LIST_VALIDATIONS action', () => {
    spyOn(ValidationsStore, 'onListValidations').and.callThrough();
    let payload = { actionType: ValidationsConstants.LIST_VALIDATIONS,
                validations: [ 'v1', 'v2'] };
    ValidationsStore._registerToActions(payload);
    expect(ValidationsStore.onListValidations).toHaveBeenCalledWith(payload.validations);
    expect(ValidationsStore.state.validations).toEqual(payload.validations);
  });
});
