const React = require('react/addons');
const TestUtils = React.addons.TestUtils;

const IronicApiService = require('../../js/services/IronicApiService');
const Nodes = require('../../js/components/nodes/Nodes');
const NodesStore = require('../../js/stores/NodesStore');

let nodesInstance;

let nodesStoreState = {
  nodes: {
    all: [],
    registered: [],
    discovered: [],
    provisioned: [],
    maintenance: []
  }
};

describe('Nodes component', () => {
  beforeEach(() => {
    spyOn(NodesStore, 'getState').and.returnValue(nodesStoreState);
    spyOn(IronicApiService, 'getNodes');
    // spyOn(Nodes, '_filterNodes').and.returnValue(nodesStoreState.nodes);
    nodesInstance = TestUtils.renderIntoDocument(<Nodes/>);
  });

  xit('should render with expected markup', () => {
    expect(TestUtils.isCompositeComponent(nodesInstance)).toBeTruthy();

    let nodesNavTabs = TestUtils.findRenderedDOMComponentWithClass(nodesInstance, 'nav nav-tabs');
    expect(nodesNavTabs).toBeDefined;
  });
});

