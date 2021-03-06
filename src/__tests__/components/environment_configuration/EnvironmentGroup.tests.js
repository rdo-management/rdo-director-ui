import React from 'react';
import TestUtils from 'react-addons-test-utils';

import EnvironmentGroup from
  '../../../js/components/environment_configuration/EnvironmentGroup';
import MockPlan from '../../mocks/MockPlan';

const envGroup = MockPlan.capabilities.topics[0].environment_groups[0];
const envGroupMultipleEnvs = MockPlan.capabilities.topics[0].environment_groups[1];

xdescribe('EnvironmentGroup component', () => {
  let EnvGroupVdom, EnvGroupInstance;
  beforeEach(() => {
    let shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(
      <EnvironmentGroup key={0}
                        title={envGroup.title}
                        description={envGroup.description}
                        environments={envGroup.environments}/>
    );
    EnvGroupVdom = shallowRenderer.getRenderOutput();
    EnvGroupInstance = shallowRenderer._instance._instance;
  });

  it('should render EnvironmentGroupHeading', () => {
    expect(EnvGroupVdom.props.children[0].type.name).toEqual('EnvironmentGroupHeading');
    expect(EnvGroupVdom.props.children[0].props.title).toBeDefined();
    expect(EnvGroupVdom.props.children[0].props.description).toBeDefined();
  });

  it('should be able to generate inputs based on environments length', () => {
    let environmentCheckboxes = EnvGroupInstance._generateInputs();
    expect(environmentCheckboxes.props.title).toEqual('Default Configuration');
  });
});

xdescribe('EnvironmentGroup component with multiple environments', () => {
  let EnvGroupVdom, EnvGroupInstance;
  beforeEach(() => {
    let shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(
      <EnvironmentGroup key={1}
                        title={envGroupMultipleEnvs.title}
                        description={envGroupMultipleEnvs.description}
                        environments={envGroupMultipleEnvs.environments}/>
    );
    EnvGroupVdom = shallowRenderer.getRenderOutput();
    EnvGroupInstance = shallowRenderer._instance._instance;
  });

  it('should render EnvironmentGroupHeading', () => {
    expect(EnvGroupVdom.props.children[0].type.name).toEqual('EnvironmentGroupHeading');
    expect(EnvGroupVdom.props.children[0].props.title).toBeDefined();
    expect(EnvGroupVdom.props.children[0].props.description).toBeDefined();
  });

  it('should be able to generate inputs based on environments length', () => {
    let environmentCheckboxes = EnvGroupInstance._generateInputs();
    expect(environmentCheckboxes.length).toEqual(2);
    expect(environmentCheckboxes[0].props.title).toEqual('BigSwitch extensions');
    expect(environmentCheckboxes[1].props.title).toEqual('Cisco N1KV backend');
  });

  it('should toggle GroupedCheckBoxes', () => {
    spyOn(EnvGroupInstance, 'setState');
    EnvGroupInstance.onGroupedCheckBoxChange(true, 'environments/neutron-ml2-bigswitch.yaml');
    expect(EnvGroupInstance.setState).toHaveBeenCalled();
  });
});
