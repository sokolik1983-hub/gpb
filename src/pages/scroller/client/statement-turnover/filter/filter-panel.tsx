import React, { useContext } from 'react';
import { DatePeriodField, OrganizationsField, AccountsField } from 'components';
import type { IGetDatePeriodResponseDto } from 'interfaces/client';
import { DATE_PERIODS } from 'interfaces/client';
import { useForm, useFormState } from 'react-final-form';
import { Fields, Pattern, Adjust, Horizon, Box, Typography } from '@platform/ui';
import { TurnoverScrollerContext } from '../turnover-scroller-context';
import type { ITurnoverScrollerContext } from '../turnover-scroller-context';
import { FORM_FIELDS } from './constants';
import type { FormState } from './interfaces';
import css from './styles.scss';

/** Фильтры скроллера. */
export const FilterPanel = () => {
  const {
    values: { datePeriod, organizations },
  } = useFormState<FormState>();
  const { batch, change, submit } = useForm();

  const { setHasError, setIsLoading, accounts } = useContext<ITurnoverScrollerContext>(TurnoverScrollerContext);

  const handleStartPeriodFetching = () => setIsLoading(true);

  const handleSuccessPeriodFetching = (period?: IGetDatePeriodResponseDto) => {
    if (!period) {
      return;
    }

    batch(() => {
      change('dateFrom', period.from);
      change('dateTo', period.to);
    });
    setIsLoading(false);
    void submit();
  };

  const handleErrorPeriodFetching = () => {
    setHasError(true);
    setIsLoading(false);
  };

  return (
    <Pattern>
      <Pattern.Span size={6}>
        <Adjust pad={[null, 'XS', null, null]}>
          <Pattern>
            <Pattern.Span size={5}>
              <Adjust pad={[null, 'X2S', null, null]}>
                {/* Выбор периода. */}
                <DatePeriodField
                  name={FORM_FIELDS.DATE_PERIOD}
                  onErrorFetching={handleErrorPeriodFetching}
                  onStartFetching={handleStartPeriodFetching}
                  onSuccessFetching={handleSuccessPeriodFetching}
                />
              </Adjust>
            </Pattern.Span>
            <Pattern.Span size={7}>
              <Adjust pad={[null, null, null, 'X2S']}>
                <Horizon>
                  <Box className={Adjust.getPadClass([null, 'X2S', null, null])}>
                    {/* Дата от. */}
                    <Fields.Date
                      extraSmall
                      disabled={datePeriod !== DATE_PERIODS.SELECT_PERIOD}
                      name={FORM_FIELDS.DATE_FROM}
                      onChange={submit}
                    />
                  </Box>
                  <Typography.Text className={css.dateDelimiter}>–</Typography.Text>
                  <Box className={Adjust.getPadClass([null, null, null, 'X2S'])}>
                    {/* Дата по. */}
                    <Fields.Date
                      extraSmall
                      disabled={datePeriod !== DATE_PERIODS.SELECT_PERIOD}
                      name={FORM_FIELDS.DATE_TO}
                      onChange={submit}
                    />
                  </Box>
                </Horizon>
              </Adjust>
            </Pattern.Span>
          </Pattern>
        </Adjust>
      </Pattern.Span>
      <Pattern.Span size={6}>
        <Adjust pad={[null, null, null, 'XS']}>
          <Pattern>
            <Pattern.Span size={6}>
              <Adjust pad={[null, 'XS', null, null]}>
                {/* Выбор счетов. */}
                <AccountsField accounts={accounts} name={FORM_FIELDS.ACCOUNTS} selectedOrganizations={organizations} onChange={submit} />
              </Adjust>
            </Pattern.Span>
            <Pattern.Span size={6}>
              <Adjust pad={[null, null, null, 'XS']}>
                {/* Выбор организаций. */}
                <OrganizationsField accounts={accounts} name={FORM_FIELDS.ORGANIZATIONS} onChange={submit} />
              </Adjust>
            </Pattern.Span>
          </Pattern>
        </Adjust>
      </Pattern.Span>
    </Pattern>
  );
};

FilterPanel.displayName = 'FilterPanel';
