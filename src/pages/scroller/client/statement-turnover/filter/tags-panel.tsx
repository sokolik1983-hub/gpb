import React, { useContext, useEffect, useMemo } from 'react';
import { TagsPanelView } from 'components';
import { DATE_PERIODS } from 'interfaces/client';
import { FORM_FIELDS } from 'pages/scroller/client/statement-turnover/filter/constants';
import type { FormState } from 'pages/scroller/client/statement-turnover/filter/interfaces';
import { orderTags, getInitialFilterValues, filerTags } from 'pages/scroller/client/statement-turnover/filter/utils';
import type { ITurnoverScrollerContext } from 'pages/scroller/client/statement-turnover/turnover-scroller-context';
import { TurnoverScrollerContext } from 'pages/scroller/client/statement-turnover/turnover-scroller-context';
import { useForm, useFormState } from 'react-final-form';
import { DATE_FORMAT } from '@platform/services';
import { formatDateTime } from '@platform/tools/date-time';
import { formatAccountCode } from '@platform/tools/localization';
import type { IOption } from '@platform/ui';
import { Gap } from '@platform/ui';

/** Панель тегов фильтра. */
export const TagsPanel = () => {
  const { restart, initialize, submit } = useForm();

  const { values } = useFormState<FormState>();

  const {
    tagsPanel: { onClick, tags, onRemoveTag, onRemoveAllTags },
    accounts,
  } = useContext<ITurnoverScrollerContext>(TurnoverScrollerContext);

  /** Вспомогательные структуры. Вычисляются один раз при монтировании компонента. */
  const [accountNamesById, organizationNamesById] = useMemo(
    () =>
      accounts.reduce<[Record<string, string>, Record<string, string>]>(
        (acc, account) => {
          const {
            bankClient: { shortName, fullName, id: bankClientId },
            id,
            accountNumber,
          } = account;

          acc[0][id] = accountNumber;
          acc[1][bankClientId] = shortName ?? fullName;

          return acc;
        },
        [{}, {}]
      ),
    [accounts]
  );

  const disableTags = (tagsToDisable: Array<IOption<string>>) =>
    tagsToDisable.map(tag => {
      const { value } = tag;

      if ((value === FORM_FIELDS.DATE_TO || value === FORM_FIELDS.DATE_FROM) && values.datePeriod !== DATE_PERIODS.SELECT_PERIOD) {
        tag.disabled = true;

        return tag;
      }

      return { ...tag, disabled: false };
    });

  const tagValueFormatter = (name: string, formValues: FormState) => {
    const value = formValues[name];

    switch (name) {
      case FORM_FIELDS.DATE_FROM:
      case FORM_FIELDS.DATE_TO:
        return formatDateTime(value, { format: DATE_FORMAT, keepLocalTime: true });
      case FORM_FIELDS.ACCOUNTS:
        return value.length === 1 ? formatAccountCode(accountNamesById[value[0]]) : value.length;
      case FORM_FIELDS.ORGANIZATIONS:
        return value.length === 1 ? organizationNamesById[value[0]] : value.length;
      default:
        return value;
    }
  };

  const preparedTags = disableTags(orderTags(filerTags(tags)));

  const resetFilters = () => {
    onRemoveAllTags();
    restart();
    initialize(getInitialFilterValues());
    void submit();
  };

  useEffect(() => {
    // Устанавливает окончательное значение фильтров и тэгов, после того как с сервера будут получены счета.
    void submit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accounts]);

  if (preparedTags.length === 0) {
    return null;
  }

  return (
    <>
      <Gap.SM />
      <TagsPanelView<FormState>
        tagValueFormatter={tagValueFormatter}
        tags={preparedTags}
        onRemoveTag={onRemoveTag}
        onRemoveTags={resetFilters}
        onTagClick={onClick}
      />
    </>
  );
};

TagsPanel.displayName = 'TagsPanel';
