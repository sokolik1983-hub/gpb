import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { ClientFormPage } from '..';

describe('ClientFormPage', () => {
  it('renders', () => {
    const wrapper = shallow(<ClientFormPage />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
