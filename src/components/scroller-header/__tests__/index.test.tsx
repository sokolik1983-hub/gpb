import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import { ScrollerHeader } from 'components';
import type { ClientTransfomedAction } from 'interfaces/client';
import { Icons } from '@platform/ui';

describe('<ScrollerHeader />', () => {
  it('отображает кнопки с действиями', () => {
    const actions: ClientTransfomedAction[] = [
      { label: 'label1', onClick: jest.fn(), name: 'name-1', icon: Icons.Statement },
      { label: 'label2', onClick: jest.fn(), name: 'name-2', icon: Icons.Statement },
    ];

    render(<ScrollerHeader actions={actions} />);

    expect(screen.getByText(actions[0].label)).toBeInTheDocument();
    userEvent.click(screen.getByText(actions[0].label));
    expect(actions[0].onClick).toHaveBeenCalled();

    expect(screen.getByText(actions[1].label)).toBeInTheDocument();
    userEvent.click(screen.getByText(actions[1].label));
    expect(actions[1].onClick).toHaveBeenCalled();
  });
});
