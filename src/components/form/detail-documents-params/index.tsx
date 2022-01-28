import React from 'react';
import { CreditParams } from 'components/form/credit-params';
import { DebitParams } from 'components/form/debit-params';
import { Row } from 'components/form/row';
import { FORM_FIELDS } from 'interfaces/form/form-state';
import { locale } from 'localization';
import { Box, Fields, Gap, Horizon, Typography } from '@platform/ui';
import { useDetailDocumentsParams } from './use-detail-documents-params';
import { useDetailDocumentsParamsVisible } from './use-detail-documents-params-visible';

/** Компонент параметров комплекта документов. */
export const DetailDocumentsParams: React.FC = () => {
  const [value, options] = useDetailDocumentsParams();
  const visible = useDetailDocumentsParamsVisible();

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

DetailDocumentsParams.displayName = 'DetailDocumentsParams';
