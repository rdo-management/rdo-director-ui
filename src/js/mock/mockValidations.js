export default {
  validations: [
    {
      description: 'Validations that run after the hardware was discovered.',
      name: 'Hardware Discovery',
      ref: '/v1/plans/undefined/validation_types/1/',
      stage: 'discovery',
      status: 'running',
      uuid: '1',
      validations: [
        {
          name: 'Basic connectivity',
          description: 'Check basic connectivity to the nodes',
          ref: '/v1/plans/undefined/validations/1/',
          uuid: '1',
          status: 'success'
        },
        {
          name: 'Install a package',
          description: 'Install necessary packages on the nodes',
          ref: '/v1/plans/undefined/validations/2/',
          uuid: '2',
          status: 'running'
        },
        {
          name: 'Verify installation',
          ref: '/v1/plans/undefined/validations/3/',
          uuid: '3',
          status: 'new'
        },
        {
          name: 'Do something really tricky',
          description: 'This is a very tricky process that could take a long time to complete',
          ref: '/v1/plans/undefined/validations/4/',
          uuid: '4',
          status: 'failed'
        }
      ]
    },
    {
      description: 'Validations verify that the network was configured properly on all nodes',
      name: 'Network Configuration',
      ref: '/v1/plans/undefined/validation_types/2/',
      stage: 'discovery',
      status: 'new',
      uuid: '2',
      validations: [
        {
          name: 'Running a custom module',
          ref: '/v1/plans/undefined/validations/3/',
          uuid: '3',
          status: 'new'
        }
      ]
    }
  ]
};
