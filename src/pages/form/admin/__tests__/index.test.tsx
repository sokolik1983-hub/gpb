import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { AdminFormPage } from '..';

describe('AdminFormPage', () => {
  it('renders', () => {
    const wrapper = shallow(<AdminFormPage />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
