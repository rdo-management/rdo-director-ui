import React from 'react';
import TestUtils from 'react-addons-test-utils';
import when from 'when';

import TripleOApiService from '../../../js/services/TripleOApiService';
import ListPlans from '../../../js/components/plan/ListPlans';

let plans = [];

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
