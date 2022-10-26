import React from 'react';
import { CreditParams } from 'components/common/form/credit-params';
import { DebitParams } from 'components/common/form/debit-params';
import { Row } from 'components/common/form/row';
import { locale } from 'localization';
import { FORM_FIELDS } from 'stream-constants/form';
import { Box, Fields, Gap, Pattern, Typography } from '@platform/ui';
import css from './styles.scss';
import { useDetailDocumentsParams } from './use-detail-documents-params';
import { useDetailDocumentsParamsVisible } from './use-detail-documents-params-visible';

/** Свойства компонента параметров комплекта документов. */
interface DetailDocumentsParamsProps {
  /** Блокировка редактирования значений. */
  disabled?: boolean;
}

/** Компонент параметров комплекта документов. */
export const DetailDocumentsParams: React.FC<DetailDocumentsParamsProps> = ({ disabled }) => {
  const [options] = useDetailDocumentsParams();
  const visible = useDetailDocumentsParamsVisible();

  if (!visible) {
    return null;
  }

  return (
    <Row align={'TOP'} label={locale.common.documentsSetParams.label}>
      <Box>
        <Fields.CheckboxGroup
          extraSmall
          columns={12}
          disabled={disabled}
          indent="MD"
          name={FORM_FIELDS.DOCUMENTS_SET_PARAMS}
          options={options}
        />
        <Gap />
        <Pattern className={css.container}>
          <Pattern.Span size={6}>
            <Typography.SmallText>{locale.common.debitParams.label}</Typography.SmallText>
            <Gap.SM />
            <DebitParams disabled={disabled} />
          </Pattern.Span>
          <Pattern.Span size={6}>
            <Typography.SmallText>{locale.common.creditParams.label}</Typography.SmallText>
            <Gap.SM />
            <CreditParams disabled={disabled} />
          </Pattern.Span>
        </Pattern>
      </Box>
    </Row>
  );
};

DetailDocumentsParams.displayName = 'DetailDocumentsParams';
