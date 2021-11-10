import React, { useContext, useEffect, useMemo } from 'react';
import { TagsPanelView } from 'components';
import { FORM_FIELDS } from 'pages/scroller/client/statement-turnover/filter/constants';
import type { FormState } from 'pages/scroller/client/statement-turnover/filter/interfaces';
import { orderTags, getInitialFilterValues, filerTags } from 'pages/scroller/client/statement-turnover/filter/utils';
import type { ITurnoverScrollerContext } from 'pages/scroller/client/statement-turnover/turnover-scroller-context';
import { TurnoverScrollerContext } from 'pages/scroller/client/statement-turnover/turnover-scroller-context';
import { useForm } from 'react-final-form';
import { DATE_FORMAT } from '@platform/services';
import { formatDateTime } from '@platform/tools/date-time';
import { formatAccountCode } from '@platform/tools/localization';
import { Gap } from '@platform/ui';

/** Панель тегов фильтра. */
export const TagsPanel = () => {
  const { restart, initialize, submit } = useForm();

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
            bankClient: { name, id: bankClientId },
            id,
            accountNumber,
          } = account;

          acc[0][id] = accountNumber;
          acc[1][bankClientId] = name;

          return acc;
        },
        [{}, {}]
      ),
    [accounts]
  );

  const organizationIds = useMemo(() => Object.keys(organizationNamesById), [organizationNamesById]);

  const tagValueFormatter = (name: string, values: FormState) => {
    const value = values[name];

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

  const filteredTags = orderTags(filerTags(tags));

  const resetFilters = () => {
    let initialValues = getInitialFilterValues();

    // Если одна организация, то она не сбрасывается.
    if (organizationIds.length === 1) {
      initialValues = { ...initialValues, organizations: [organizationIds[0]] };
    }

    onRemoveAllTags();
    restart();
    initialize(initialValues);
    void submit();
  };

  useEffect(() => {
    // Устанавливает окончательное значение фильтров и тэгов.
    // После того как с сервера будут получены счета.
    resetFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [organizationIds]);

  if (filteredTags.length === 0) {
    return null;
  }

  return (
    <>
      <Gap.SM />
      <TagsPanelView
        tagValueFormatter={tagValueFormatter}
        tags={filteredTags}
        onRemoveTag={onRemoveTag}
        onRemoveTags={resetFilters}
        onTagClick={onClick}
      />
    </>
  );
};

TagsPanel.displayName = 'TagsPanel';
