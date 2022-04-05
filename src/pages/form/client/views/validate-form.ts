import type { ValidationErrors } from 'final-form';
import { statementRequestValidationSchema } from 'utils';
import { validate } from '@platform/validation';

export const validateForm: (values: unknown) => Promise<ValidationErrors> | ValidationErrors = validate(statementRequestValidationSchema);
