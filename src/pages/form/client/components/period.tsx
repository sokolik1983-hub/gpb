import React from 'react';
import { locale } from 'localization';
import { Dates } from 'pages/form/client/components/dates';
import { PeriodType } from 'pages/form/client/components/period-type';
import { Row } from 'pages/form/client/components/row';
import { Gap } from '@platform/ui';

export const Period: React.FC = () => {
  const isOneTimeStatementType = true;

  return isOneTimeStatementType ? (
    <Row label={locale.common.period.label}>
      <PeriodType />
      <Gap />
      <Dates />
    </Row>
  ) : null;
};

Period.displayName = 'Period';
