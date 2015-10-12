const AppDispatcher = require('../../js/dispatchers/AppDispatcher');
const NodesActions = require('../../js/actions/NodesActions');
const NodesConstants = require('../../js/constants/NodesConstants');

let mockGetNodesResponse = [
  { uuid: 1 },
  { uuid: 2 }
];

describe('NodesActions', () => {
  it('creates action to list nodes', () => {
    spyOn(AppDispatcher, 'dispatch').and.callThrough();
    NodesActions.listNodes(mockGetNodesResponse);
    expect(AppDispatcher.dispatch).toHaveBeenCalledWith({
      actionType: NodesConstants.LIST_NODES,
      nodes: mockGetNodesResponse
    });
  });
});
