import React from 'react';
import TestUtils from 'react-addons-test-utils';

import ListPlans from '../../../js/components/plan/ListPlans';

describe('ListPlans component', () => {
  let output;

  beforeEach(() => {
    let shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<ListPlans />);
    output = shallowRenderer.getRenderOutput();
  });

  xit('renders a table of plan names', () => {
    expect(output.type.name).toEqual('ListPlans');
  });
});
