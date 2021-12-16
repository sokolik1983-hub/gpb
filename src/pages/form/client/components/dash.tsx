import React from 'react';
import { Gap, Typography } from '@platform/ui';

export const Dash: React.FC = () => (
  <>
    <Gap.X2S />
    <Typography.Text>–</Typography.Text>
    <Gap.X2S />
  </>
);

Dash.displayName = 'Dash';
