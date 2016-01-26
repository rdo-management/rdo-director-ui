import * as _ from 'lodash';
import request from 'reqwest';
import when from 'when';

import TempStorage from './TempStorage';
import LoginStore from '../stores/LoginStore';

class MistralApiService {
  defaultRequest(additionalAttributes) {
    return _.merge({
      headers: {
        'X-Auth-Token': TempStorage.getItem('keystoneAuthTokenId')
      },
      crossOrigin: true,
      contentType: 'application/json',
      type: 'json',
      method: 'GET'
    }, additionalAttributes);
  }

  /**
   * Gets a Workflow execution
   * Mistral API: GET /v2/executions/:execution_id
   * @param {string} id - Workflow Execution ID
   * @return {object} Execution.
   */
  getWorkflowExecution(id) {
    return when(request(this.defaultRequest(
      {
        url: LoginStore.getServiceUrl('mistral') + '/executions/' + id
      }
    )));
  }

  /**
   * Starts a new Workflow execution
   * Mistral API: POST /v2/executions
   * @param {string} workflowName - Workflow name
   * @param {object} input - Workflow input object
   * @return {object} Execution.
   */
  runWorkflow(workflowName, input = {}) {
    return when(request(this.defaultRequest(
      {
        method: 'POST',
        url: LoginStore.getServiceUrl('mistral') + '/executions',
        data: JSON.stringify({
          workflow_name: workflowName,
          input: JSON.stringify(input)
        })
      }
    )));
  }

  /**
   * Starts a new Action execution
   * Mistral API: POST /v2/action_executions
   * @param {string} actionName - Name of the Action to be executed
   * @param {object} input - Action input object
   * @return {object} Action Execution.
   */
  runAction(actionName, input = {}) {
    return when(request(this.defaultRequest(
      {
        method: 'POST',
        url: LoginStore.getServiceUrl('mistral') + '/action_executions',
        data: JSON.stringify({
          name: actionName,
          input: JSON.stringify(input)
        })
      }
    )));
  }
}

export default new MistralApiService();
