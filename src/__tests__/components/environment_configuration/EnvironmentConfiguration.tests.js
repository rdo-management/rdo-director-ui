import React from 'react';
import TestUtils from 'react-addons-test-utils';

import EnvironmentConfiguration from
  '../../../js/components/environment_configuration/EnvironmentConfiguration';
import MockPlan from '../../mocks/MockPlan';

describe('EnvironmentConfiguration component', () => {
  let EnvConfVdom, EnvConfInstance;
  beforeEach(() => {
    let shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(
      <EnvironmentConfiguration plan={{}}/>
    );
    EnvConfVdom = shallowRenderer.getRenderOutput();
    EnvConfInstance = shallowRenderer._instance._instance;
  });

  it('should render a form with topic panels and environment groups', () => {
    EnvConfInstance.state = { environmentConfiguration: MockPlan };
    let form = EnvConfVdom.props.children[1].props.children.props.children[1];
    expect(form.ref).toEqual('environmentConfigurationForm');
    let EnvConfTopics = form.props.children[0].props.children.props.children;
    expect(EnvConfTopics.length).toEqual(0);
  });
});
