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

  it('should render a modal with form including topic tabs and environment topic tab panes', () => {
    EnvConfInstance.state = { environmentConfiguration: MockPlan };
    let modal = EnvConfVdom.props.children[0];
    expect(modal.props.className).toEqual('modal modal-routed in');
    expect(modal.props.children.props.className).toEqual('modal-dialog modal-lg');
    expect(modal.props.children.props.children.props.className).toEqual('modal-content');
    let form = modal.props.children.props.children.props.children;
    expect(form.ref).toEqual('environmentConfigurationForm');
    let formModalBodyRow = form.props.children[1].props.children[1];
    let tabs = formModalBodyRow.props.children[0].props.children.props.children;
    expect(tabs.length).toEqual(0);
    let tabPanes = formModalBodyRow.props.children[1].props.children.props.children;
    expect(tabPanes.length).toEqual(0);
  });
});
