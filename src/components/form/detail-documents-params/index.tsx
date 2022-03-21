import React from 'react';
import { CreditParams } from 'components/form/credit-params';
import { DebitParams } from 'components/form/debit-params';
import { Row } from 'components/form/row';
import { locale } from 'localization';
import { FORM_FIELDS } from 'stream-constants/form';
import { Box, Fields, Gap, Horizon, Typography } from '@platform/ui';
import { useDetailDocumentsParams } from './use-detail-documents-params';
import { useDetailDocumentsParamsVisible } from './use-detail-documents-params-visible';

/** Компонент параметров комплекта документов. */
export const DetailDocumentsParams: React.FC = () => {
  const [options] = useDetailDocumentsParams();
  const visible = useDetailDocumentsParamsVisible();

  if (!visible) {
    return null;
  }

  return (
    <Row align={'TOP'} label={locale.common.documentsSetParams.label}>
      <Box>
        <Fields.CheckboxGroup extraSmall columns={12} indent="MD" name={FORM_FIELDS.DOCUMENTS_SET_PARAMS} options={options} />
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
  );
};

DetailDocumentsParams.displayName = 'DetailDocumentsParams';
