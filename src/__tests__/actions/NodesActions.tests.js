import NodesActions from '../../js/actions/NodesActions';
import NodesConstants from '../../js/constants/NodesConstants';

const mockGetNodesResponse = [
  { uuid: 1 },
  { uuid: 2 }
];

describe('Nodes Actions', () => {
  it('creates action to request nodes', (done) => {
    const expectedAction = {
      type: NodesConstants.REQUEST_NODES
    };
    expect(NodesActions.requestNodes()).toEqual(expectedAction);
  });

  it('creates action to receive nodes', () => {
    const expectedAction = {
      type: NodesConstants.RECEIVE_NODES,
      payload: mockGetNodesResponse
    };
    expect(NodesActions.receiveNodes(mockGetNodesResponse)).toEqual(expectedAction);
  });
});

// TODO(jtomasek): add tests for async actions http://redux.js.org/docs/recipes/WritingTests.html
describe('Asynchronous Nodes Actions', () => {
});
