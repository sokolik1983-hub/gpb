import type { FC } from 'react';
import React from 'react';
import { Spinner } from 'components/spinner';
import { Gap, Adjust } from '@platform/ui';

/** Лоадер скроллера, отображается вместо содержимого таблицы, во время выполнения запроса. */
export const ScrollerSpinnerPlaceholder: FC = () => (
  <Adjust hor="CENTER">
    <Gap.X3L />
    <Gap.X3L />
    <Gap.X2L />
    <Spinner />
  </Adjust>
);

ScrollerSpinnerPlaceholder.displayName = 'ScrollerSpinner';
