import type { FC } from 'react';
import React, { useContext, useMemo } from 'react';
import { TagsPanelView } from 'components/common';
import { useFilterTags } from 'hooks/common';
import type { ITagsPanelProps } from 'interfaces';
import { locale } from 'localization';
import { StatementHistoryScrollerContext } from 'pages/scroller/admin/statement-history/context';
import type { FilterValues } from 'pages/scroller/admin/statement-history/filter/types';
import { useFormState } from 'react-final-form';
import { ALL_VALUE, DATE_PERIOD_SCROLLER_LABELS } from 'stream-constants';
import { STATEMENT_REQUEST_STATUS_LABEL, STATEMENT_STATUS_LABEL } from 'stream-constants/admin';
import { getFullName, orderTags } from 'utils/common';
import { Gap } from '@platform/ui';
import { ADDITIONAL_FORM_FIELDS, FORM_FIELDS, STATEMENT_TYPE_OPTIONS } from '../filter/constants';

/** Разделитель списка значений. */
const separator = ', ';

/** Панель тегов фильтра скроллера Истории запросов выписок. */
export const TagsPanel: FC<ITagsPanelProps> = ({ defaultAdditionalFilterValues, onChangeVisibleAdditionalFilter }) => {
  const { valid, values: formValues } = useFormState<FilterValues>();

  const {
    filterPanel: { values: storageValues },
    organizations,
    selectedOrganizations,
    selectedUsers,
    serviceBranches,
    tagsPanel: { tags },
    users,
  } = useContext(StatementHistoryScrollerContext);

  const values = valid ? storageValues : formValues;

  const allOrganizations = useMemo(() => [...selectedOrganizations, ...organizations], [organizations, selectedOrganizations]);

  const allUsers = useMemo(() => [...selectedUsers, ...users], [selectedUsers, users]);

  const { onOpenAdditionalFilter, onRemoveTag, onRemoveAllTags } = useFilterTags<FilterValues>({
    defaultAdditionalFilterValues,
    fieldsWithTags: ADDITIONAL_FORM_FIELDS,
    onChangeVisibleAdditionalFilter,
    values,
  });

  /**
   * Форматтер значения тегов для отображения.
   *
   * @param name - Имя поля.
   * @param formState - Состояние формы.
   */
  const tagValueFormatter = (name: keyof FilterValues, formState: FilterValues): string[] | string => {
    const value = formState[name];

    switch (name) {
      case FORM_FIELDS.ORGANIZATION_IDS: {
        if (allOrganizations.length === 0) {
          return '';
        }

        return (value as string[])
          .map(item => {
            const { fullName = '', shortName = '' } = allOrganizations.find(({ id }) => id === item) || {};

            return shortName || fullName;
          })
          .join(separator);
      }
      case FORM_FIELDS.PERIOD:
        return (value as string[]).map(item => DATE_PERIOD_SCROLLER_LABELS[item]).join(separator);
      case FORM_FIELDS.REQUEST_STATUS: {
        const requestStatuses = value as string[];

        if (requestStatuses.includes(ALL_VALUE)) {
          return locale.form.labels.selectAll;
        }

        return requestStatuses.map(item => STATEMENT_REQUEST_STATUS_LABEL[item]).join(separator);
      }
      case FORM_FIELDS.SIGNED:
        return '';
      case FORM_FIELDS.SERVICE_BRANCH_IDS: {
        if (serviceBranches.length === 0) {
          return '';
        }

        return (value as string[])
          .map(item => {
            const { filialName = '' } = serviceBranches.find(({ id }) => id === item) || {};

            return filialName;
          })
          .join(separator);
      }
      case FORM_FIELDS.STATEMENT_STATUS: {
        const statementStatuses = value as string[];

        if (statementStatuses.includes(ALL_VALUE)) {
          return locale.form.labels.selectAll;
        }

        return (value as string[]).map(item => STATEMENT_STATUS_LABEL[item]).join(separator);
      }
      case FORM_FIELDS.STATEMENT_TYPE:
        return STATEMENT_TYPE_OPTIONS.find(option => option.value === (value as string))!.label;
      case FORM_FIELDS.USER_IDS: {
        if (allUsers.length === 0) {
          return '';
        }

        return (value as string[])
          .map(item => {
            const { familyName = '', firstName = '', middleName = '' } = allUsers.find(({ id }) => id === item) || {};

            return getFullName([familyName, firstName, middleName]);
          })
          .join(separator);
      }
      default:
        return value as string[] | string;
    }
  };

  /** Получение отфильтрованных тэгов. */
  const preparedTags = orderTags(tags, ADDITIONAL_FORM_FIELDS).filter(tag => {
    const value = values[tag.value];

    if (Array.isArray(value) && (value.length === 0 || value.includes(ALL_VALUE))) {
      return false;
    }

    return Boolean(value);
  });

  if (preparedTags.length === 0) {
    return null;
  }

  return (
    <>
      <Gap.SM />
      <TagsPanelView<FilterValues>
        tagValueFormatter={tagValueFormatter}
        tags={preparedTags}
        values={values}
        onRemoveTag={onRemoveTag}
        onRemoveTags={onRemoveAllTags}
        onTagClick={onOpenAdditionalFilter}
      />
    </>
  );
};

TagsPanel.displayName = 'TagsPanel';
