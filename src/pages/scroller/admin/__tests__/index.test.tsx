import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { AdminScrollerPage } from '..';

describe('AdminScrollerPage', () => {
  it('renders', () => {
    const wrapper = shallow(<AdminScrollerPage />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
