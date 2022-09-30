import React from 'react';
import { Box } from '@platform/ui';
import css from './styles.scss';

/** ЭФ создания запроса на выписку. */
export const CreateStatementForm: React.FC = () => <Box className={css.form} fill={'FAINT'} />;

CreateStatementForm.displayName = 'CreateStatementForm';
