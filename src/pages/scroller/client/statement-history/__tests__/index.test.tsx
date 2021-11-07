import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { StatementHistoryScrollerPage } from '..';

describe('StatementHistoryScrollerPage', () => {
  it('renders', () => {
    // Подход взят отсюда https://testing-library.com/docs/example-react-router/
    const history = createMemoryHistory();

    const wrapper = shallow(
      <Router history={history}>
        <StatementHistoryScrollerPage />
      </Router>
    );

    // wrapper.find(StatementHistoryScrollerPage) используется, чтобы решить эту https://stackoverflow.com/q/44490100/13262779 проблему
    expect(toJson(wrapper.find(StatementHistoryScrollerPage))).toMatchSnapshot();
  });
});
