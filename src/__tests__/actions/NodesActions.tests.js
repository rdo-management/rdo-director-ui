import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import createMockStoreDone from '../utils/createMockStoreDone';
import NodesActions from '../../js/actions/NodesActions';
import NodesConstants from '../../js/constants/NodesConstants';

const mockGetNodesResponse = [
  { uuid: 1 },
  { uuid: 2 }
];

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

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
});

describe('Asynchronous Nodes Actions', () => {
  afterEach(() => { nock.cleanAll(); });
  it('creates an action to fetch nodes', (done) => {
    nock(/.*:6385/)
      .get('/nodes')
      .reply(200, mockGetNodesResponse);
    nock(/.*:6385/)
      .get('/nodes/1')
      .reply(200, mockGetNodesResponse[0]);
    nock(/.*:6385/)
      .get('/nodes/2')
      .reply(200, mockGetNodesResponse[1]);

    const expectedActions = [
      { type: NodesConstants.REQUEST_NODES },
      { type: NodesConstants.RECEIVE_NODES, payload: mockGetNodesResponse }
    ];
    const store = mockStore({ nodes: [] }, expectedActions, createMockStoreDone(done));
    store.dispatch(NodesActions.fetchNodes());
  });
});
