import ValidationsActions from '../../js/actions/ValidationsActions';
import ValidationsConstants from '../../js/constants/ValidationsConstants';

describe('Validations actions', () => {
  it('should create an action for pending Validation Stages request', () => {
    const expectedAction = {
      type: ValidationsConstants.FETCH_VALIDATION_STAGES_PENDING
    };
    expect(ValidationsActions.fetchValidationStagesPending()).toEqual(expectedAction);
  });

  it('should create an action for successful Validation Stages retrieval', () => {
    const normalizedStagesResponse = {
      entities: {
        1: 'first stage',
        2: 'second stage'
      },
      result: [1, 2]
    };
    const expectedAction = {
      type: ValidationsConstants.FETCH_VALIDATION_STAGES_SUCCESS,
      payload: normalizedStagesResponse
    };
    expect(ValidationsActions.fetchValidationStagesSuccess(normalizedStagesResponse))
      .toEqual(expectedAction);
  });

  it('should create an action to update Validation Stage status', () => {
    const expectedAction = {
      type: ValidationsConstants.UPDATE_STAGE_STATUS,
      payload: {
        uuid: 1,
        status: 'running'
      }
    };
    expect(ValidationsActions.updateValidationStageStatus(1, 'running')).toEqual(expectedAction);
  });

  it('should create an action to update Validation status', () => {
    const expectedAction = {
      type: ValidationsConstants.UPDATE_VALIDATION_STATUS,
      payload: {
        uuid: 1,
        status: 'failed'
      }
    };
    expect(ValidationsActions.updateValidationStatus(1, 'failed')).toEqual(expectedAction);
  });
});
