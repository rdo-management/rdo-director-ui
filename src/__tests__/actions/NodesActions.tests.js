const NodesActions = require('../../js/actions/NodesActions');
const NodesConstants = require('../../js/constants/NodesConstants');

let mockGetNodesResponse = [
  { uuid: 1 },
  { uuid: 2 }
];

describe('NodesActions', () => {
  it('creates action to list nodes', () => {
    const expectedAction = {
      type: NodesConstants.LIST_NODES,
      payload: mockGetNodesResponse
    };
    expect(NodesActions.listNodes(mockGetNodesResponse)).toEqual(expectedAction);
  });
});
