import React from 'react';
import { locale } from 'localization';
import { CreditParams } from 'pages/form/client/components/credit-params';
import { DebitParams } from 'pages/form/client/components/debit-params';
import { Row } from 'pages/form/client/components/row';
import { useDocumentsSetParams } from 'pages/form/client/hooks/use-documents-set-params';
import { useDocumentsSetParamsVisible } from 'pages/form/client/hooks/use-documents-set-params-visible';
import { FORM_FIELDS } from 'pages/form/client/interfaces/form-state';
import { Box, Fields, Gap, Horizon, Typography } from '@platform/ui';

/** Компонент параметров комплекта документов. */
export const DocumentsSetParams: React.FC = () => {
  const [value, options] = useDocumentsSetParams();
  const visible = useDocumentsSetParamsVisible();

  return visible ? (
    <Row label={locale.common.documentsSetParams.label}>
      <Box>
        <Fields.CheckboxGroup extraSmall columns={12} indent="MD" name={FORM_FIELDS.DOCUMENTS_SET_PARAMS} options={options} value={value} />
        <Gap />
        <Horizon>
          <Box>
            <Typography.SmallText>{locale.common.debitParams.label}</Typography.SmallText>
            <Gap.SM />
            <DebitParams />
          </Box>
          <Box>
            <Typography.SmallText>{locale.common.creditParams.label}</Typography.SmallText>
            <Gap.SM />
            <CreditParams />
          </Box>
        </Horizon>
      </Box>
    </Row>
  ) : null;
};

DocumentsSetParams.displayName = 'DocumentsSetParams';
