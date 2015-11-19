import ValidationsConstants from '../../js/constants/ValidationsConstants';
import ValidationsStore from '../../js/stores/ValidationsStore';

describe('Validations Store', () => {
  it('should call onListStages on LIST_STAGES action', () => {
    spyOn(ValidationsStore, 'onListStages').and.callThrough();
    let payload = { actionType: ValidationsConstants.LIST_STAGES,
                stages: [ 's1', 's2'] };
    ValidationsStore._registerToActions(payload);
    expect(ValidationsStore.onListStages).toHaveBeenCalledWith(payload.stages);
    expect(ValidationsStore.state.stages).toEqual(payload.stages);
  });
});
