import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { ClientScrollerPage } from '..';

describe('ClientScrollerPage', () => {
  it('renders', () => {
    const wrapper = shallow(<ClientScrollerPage />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
