import React from 'react';
import TestUtils from 'react-addons-test-utils';

import EnvironmentConfigurationTopic from
  '../../../js/components/environment_configuration/EnvironmentConfigurationTopic';
import MockPlan from '../../mocks/MockPlan';

const topic = MockPlan.capabilities.topics[0];

describe('EnvironmentConfigurationTopic component', () => {
  let EnvConfTopicVdom;
  beforeEach(() => {
    let shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(
      <EnvironmentConfigurationTopic key={0}
                                     title={topic.title}
                                     description={topic.description}
                                     environmentGroups={topic.environment_groups}/>
    );
    EnvConfTopicVdom = shallowRenderer.getRenderOutput();
  });

  it('should render title and desctiption in panel-heading', () => {
    let panelHeading = EnvConfTopicVdom.props.children.props.children[0];
    expect(panelHeading.props.className).toEqual('panel-heading');
    expect(panelHeading.props.children[0].type).toEqual('h3');
    expect(panelHeading.props.children[0].props.children).toEqual('Basic Configuration');
    expect(panelHeading.props.children[1].type).toEqual('small');
    expect(panelHeading.props.children[1].props.className).toEqual('subheader');
    expect(panelHeading.props.children[1].props.children).toEqual(null);
  });


  it('should render list of EnvironmentGroups in panel-body', () => {
    let panelBody = EnvConfTopicVdom.props.children.props.children[1];
    expect(panelBody.props.className).toContain('panel-body');
    expect(panelBody.props.children.length).toEqual(2);
    expect(panelBody.props.children[0].type.name).toEqual('EnvironmentGroup');
    expect(panelBody.props.children[1].type.name).toEqual('EnvironmentGroup');
  });
});
