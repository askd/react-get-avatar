/* eslint-env jest */

import { shallow } from 'enzyme';

import React from 'react';
import GetAvatar from '../lib/components/GetAvatar/GetAvatar';

describe('<GetAvatar />', () => {
  it('should render', () => {
    const component = shallow(<GetAvatar width={100} height={100} />);

    expect(component).toMatchSnapshot();
  });
});
