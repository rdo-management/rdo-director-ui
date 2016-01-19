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
      <EnvironmentConfiguration plan={{}} route={{parentPath: '/overview'}}/>
    );
    EnvConfVdom = shallowRenderer.getRenderOutput();
    EnvConfInstance = shallowRenderer._instance._instance;
  });

  it('should render a modal with form', () => {
    EnvConfInstance.state = { environmentConfiguration: MockPlan,
                              environmentConfigurationLoaded: true };
    let modal = EnvConfVdom.props.children[0];
    expect(modal.props.className).toEqual('modal modal-routed in');
    expect(modal.props.children.props.className).toEqual('modal-dialog modal-lg');
    expect(modal.props.children.props.children.props.className).toEqual('modal-content');
    let form = modal.props.children.props.children.props.children;
    expect(form.ref).toEqual('environmentConfigurationForm');
  });
});
