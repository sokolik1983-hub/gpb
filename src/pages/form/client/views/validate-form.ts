import { statementRequestValidationSchema } from 'utils';
import { validate } from '@platform/validation';

export const validateForm = validate(statementRequestValidationSchema);
