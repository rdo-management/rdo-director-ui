import NodesActions from '../../js/actions/NodesActions';
import NodesConstants from '../../js/constants/NodesConstants';

const mockGetNodesResponse = [
  { uuid: 1 },
  { uuid: 2 }
];

describe('Nodes Actions', () => {
  it('creates action to request nodes', () => {
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

  it('creates action to notify that nodes operation started', () => {
    const expectedAction = {
      type: NodesConstants.START_NODES_OPERATION
    };
    expect(NodesActions.startOperation(mockGetNodesResponse)).toEqual(expectedAction);
  });

  it('creates action to notify that nodes operation finished', () => {
    const expectedAction = {
      type: NodesConstants.FINISH_NODES_OPERATION
    };
    expect(NodesActions.finishOperation(mockGetNodesResponse)).toEqual(expectedAction);
  });

  it('creates action to notify that nodes operation started', () => {
    const expectedAction = {
      type: NodesConstants.START_NODES_OPERATION
    };
    expect(NodesActions.startOperation(mockGetNodesResponse)).toEqual(expectedAction);
  });

  it('creates action to notify that nodes operation finished', () => {
    const expectedAction = {
      type: NodesConstants.FINISH_NODES_OPERATION
    };
    expect(NodesActions.finishOperation(mockGetNodesResponse)).toEqual(expectedAction);
  });
});
