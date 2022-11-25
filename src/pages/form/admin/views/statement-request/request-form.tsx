import type { FC, FormEventHandler } from 'react';
import React, { useCallback, useEffect } from 'react';
import { CreationParams } from 'components/admin/form/creation-params';
import { OrganizationOption, SelectWithSearch } from 'components/common';
import { DetailDocumentsParams } from 'components/common/form/detail-documents-params';
import { FileFormats } from 'components/common/form/file-formats';
import { Operations } from 'components/common/form/operations';
import { Period } from 'components/common/form/period';
import { Row } from 'components/common/form/row';
import { usePrevious } from 'hooks/common';
import type { StatementRequestFormValues } from 'interfaces/admin/form/form-state';
import { locale } from 'localization';
import { FormProvider } from 'pages/form/admin/form-provider';
import { AccountOption, BranchOption } from 'pages/form/admin/views/statement-request/components';
import { ACCOUNT_FIELD, FORM_FIELD_LABELS, FORM_FIELDS } from 'pages/form/admin/views/statement-request/constants';
import { Footer } from 'pages/form/admin/views/statement-request/footer';
import {
  ACCOUNT_DEPS_ACTION_TYPE,
  useAccounts,
  useAccountTypes,
  useOrganizations,
  useServiceBranches,
} from 'pages/form/admin/views/statement-request/hooks';
import { useForm, useFormState } from 'react-final-form';
import { Box, Fields, FormValidation, Pattern } from '@platform/ui';
import css from '../styles.scss';

/** Свойства формы запроса выписки. */
interface RequestFormProps {
  /** Колбэк отправки формы. */
  onSubmit: FormEventHandler<HTMLFormElement>;
}

/** Форма запроса выписки. */
export const RequestForm: FC<RequestFormProps> = ({ onSubmit }) => {
  const { batch, change } = useForm();
  const {
    active,
    values: { accountIds, accountTypeCodes, organizationIds, serviceBranchIds },
  } = useFormState<StatementRequestFormValues>();

  const {
    options: organizationOptions,
    setDependentIds: setDependentOrganizationIds,
    setSearchValue: setOrganizationSearchValue,
  } = useOrganizations();

  const { options: accountTypeOptions, setDependentCodes } = useAccountTypes();

  const {
    options: serviceBranchOptions,
    setDependentIds: setDependentServiceBranchIds,
    setSearchValue: setServiceBranchSearchValue,
  } = useServiceBranches();

  const { options: accountOptions, setDep: setAccountDep, setSearchValue: setAccountSearchValue } = useAccounts();

  /** Предикат проверки, что данные переданного списка по имени поля не полностью входят в выбранные счета. */
  const isNotEveryInAccounts = useCallback(
    (fieldName: string, list: unknown[]) => !accountIds.every(account => list.includes(account[fieldName])),
    [accountIds]
  );

  /** Возвращает актуальный список зависимости счета. */
  const getRelevantListByName = useCallback(
    (fieldName: string, list: unknown[]) =>
      accountIds.length === 0 ? list : list.filter(item => accountIds.find(accountData => accountData[fieldName] === item)),
    [accountIds]
  );

  /** Возвращает актуальный список счетов переданной зависимости. */
  const getRelevantAccountList = useCallback(
    (fieldName: string, list: unknown[]) => accountIds.filter(account => list.includes(account[fieldName])),
    [accountIds]
  );

  const prevOrganizationIds = usePrevious(organizationIds);

  // Изменение организаций
  useEffect(() => {
    if (active === FORM_FIELDS.ORGANIZATION_IDS) {
      setAccountDep({ type: ACCOUNT_DEPS_ACTION_TYPE.SET_ORGANIZATIONS, payload: organizationIds });

      // При удалении.
      if (prevOrganizationIds!.length > organizationIds.length && isNotEveryInAccounts(ACCOUNT_FIELD.BANK_CLIENT_ID, organizationIds)) {
        change(FORM_FIELDS.ACCOUNTS, getRelevantAccountList(ACCOUNT_FIELD.BANK_CLIENT_ID, organizationIds));
      }
    }
    // Только при изменении организаций
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [organizationIds]);

  const prevServiceBranchIds = usePrevious(serviceBranchIds);

  // Изменение подразделений обслуживания
  useEffect(() => {
    if (active === FORM_FIELDS.SERVICE_BRANCH_IDS) {
      setAccountDep({ type: ACCOUNT_DEPS_ACTION_TYPE.SET_SERVICE_BRANCHES, payload: serviceBranchIds });

      // При удалении.
      if (prevServiceBranchIds!.length > serviceBranchIds.length && isNotEveryInAccounts(ACCOUNT_FIELD.BRANCH_ID, serviceBranchIds)) {
        change(FORM_FIELDS.ACCOUNTS, getRelevantAccountList(ACCOUNT_FIELD.BRANCH_ID, serviceBranchIds));
      }
    }
    // Только при изменении подразделений обслуживания
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceBranchIds]);

  const prevAccountTypeCodes = usePrevious(accountTypeCodes);

  // Изменение типов счетов
  useEffect(() => {
    if (active === FORM_FIELDS.ACCOUNT_TYPE_CODES) {
      setAccountDep({ type: ACCOUNT_DEPS_ACTION_TYPE.SET_ACCOUNT_TYPE_CODES, payload: accountTypeCodes });

      // При удалении.
      if (
        prevAccountTypeCodes!.length > accountTypeCodes.length &&
        isNotEveryInAccounts(ACCOUNT_FIELD.ACCOUNT_TYPE_CODE, accountTypeCodes)
      ) {
        change(FORM_FIELDS.ACCOUNTS, getRelevantAccountList(ACCOUNT_FIELD.ACCOUNT_TYPE_CODE, accountTypeCodes));
      }
    }
    // Только при изменении типов счетов
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountTypeCodes]);

  // Изменение счетов
  useEffect(() => {
    if (active === FORM_FIELDS.ACCOUNTS) {
      const { accountTypeCodeList, bankClientIdList, branchIdList } = accountIds.reduce<{
        accountTypeCodeList: number[];
        bankClientIdList: string[];
        branchIdList: string[];
      }>(
        (prevValue, { accountTypeCode, bankClientId, branchId }) => ({
          accountTypeCodeList: [...prevValue.accountTypeCodeList, accountTypeCode],
          bankClientIdList: [...prevValue.bankClientIdList, bankClientId],
          branchIdList: [...prevValue.branchIdList, branchId],
        }),
        { accountTypeCodeList: [], bankClientIdList: [], branchIdList: [] }
      );

      setDependentOrganizationIds(bankClientIdList);
      setDependentServiceBranchIds(branchIdList);
      setDependentCodes(accountTypeCodeList);

      batch(() => {
        if (isNotEveryInAccounts(ACCOUNT_FIELD.BANK_CLIENT_ID, organizationIds)) {
          change(FORM_FIELDS.ORGANIZATION_IDS, getRelevantListByName(ACCOUNT_FIELD.BANK_CLIENT_ID, organizationIds));
        }

        if (isNotEveryInAccounts(ACCOUNT_FIELD.BRANCH_ID, serviceBranchIds)) {
          change(FORM_FIELDS.SERVICE_BRANCH_IDS, getRelevantListByName(ACCOUNT_FIELD.BRANCH_ID, serviceBranchIds));
        }

        if (isNotEveryInAccounts(ACCOUNT_FIELD.ACCOUNT_TYPE_CODE, accountTypeCodes)) {
          change(FORM_FIELDS.ACCOUNT_TYPE_CODES, getRelevantListByName(ACCOUNT_FIELD.ACCOUNT_TYPE_CODE, accountTypeCodes));
        }
      });
    }
    // Только при изменении счетов
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountIds]);

  return (
    <FormProvider onSubmit={onSubmit}>
      <Pattern gap={'XL'}>
        <Pattern.Span size={9}>
          <Period />
          <Row label={locale.admin.statementRequestForm.label.organization}>
            <Box className={css.select}>
              <SelectWithSearch
                multi
                name={FORM_FIELDS.ORGANIZATION_IDS}
                optionTemplate={OrganizationOption}
                searchOptions={organizationOptions}
                setSearchValue={setOrganizationSearchValue}
              />
            </Box>
          </Row>
          <Row label={locale.admin.statementRequestForm.label.serviceBranch}>
            <Box className={css.select}>
              <SelectWithSearch
                multi
                name={FORM_FIELDS.SERVICE_BRANCH_IDS}
                optionTemplate={BranchOption}
                searchOptions={serviceBranchOptions}
                setSearchValue={setServiceBranchSearchValue}
              />
            </Box>
          </Row>
          <Row label={locale.admin.statementRequestForm.label.accountType}>
            <Box className={css.select}>
              <Fields.MultiSelect extraSmall name={FORM_FIELDS.ACCOUNT_TYPE_CODES} options={accountTypeOptions} />
            </Box>
          </Row>
          <Row label={locale.admin.statementRequestForm.label.account}>
            <Box className={css.select}>
              <SelectWithSearch
                multi
                name={FORM_FIELDS.ACCOUNTS}
                optionTemplate={AccountOption}
                searchOptions={accountOptions}
                setSearchValue={setAccountSearchValue}
              />
            </Box>
          </Row>
          <Operations />
          <FileFormats />
          <CreationParams withEntriesList={false} />
          <DetailDocumentsParams />
          <Footer />
        </Pattern.Span>
        <Pattern.Span size={3}>
          <FormValidation fieldLabels={FORM_FIELD_LABELS} />
        </Pattern.Span>
      </Pattern>
    </FormProvider>
  );
};

RequestForm.displayName = 'RequestForm';
