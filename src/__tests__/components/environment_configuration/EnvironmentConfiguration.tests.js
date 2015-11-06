import React from 'react';
import TestUtils from 'react-addons-test-utils';

import EnvironmentConfiguration from
  '../../../js/components/environment_configuration/EnvironmentConfiguration';
import MockPlan from '../../mocks/MockPlan';

describe('EnvironmentConfiguration component', () => {
  let EnvConfVdom;
  beforeEach(() => {
    let shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(
      <EnvironmentConfiguration plan={MockPlan}/>
    );
    EnvConfVdom = shallowRenderer.getRenderOutput();
  });

  it('should render a form with topic panels and environment groups', () => {
    let form = EnvConfVdom.props.children[1].props.children.props.children[1];
    expect(form.ref).toEqual('environmentConfigurationForm');
    let EnvConfTopics = form.props.children[0].props.children.props.children;
    expect(EnvConfTopics.length).toEqual(1);
    expect(EnvConfTopics[0].props.title).toEqual('Basic Configuration');
    let environmentGroups = EnvConfTopics[0].props.environmentGroups;
    expect(environmentGroups[0].environments.length).toEqual(1);
    expect(environmentGroups[0].environments[0].enabled).toBeTruthy();
    expect(environmentGroups[0].environments[0].title).toEqual('Default Configuration');
    expect(environmentGroups[1].environments.length).toEqual(2);
  });
});
