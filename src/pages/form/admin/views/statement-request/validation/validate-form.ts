import type { ValidationErrors } from 'final-form';
import type { StatementRequestFormValues } from 'interfaces/admin/form';
import { validationSchema } from 'pages/form/admin/views/statement-request/validation/schema';
import { validate } from '@platform/validation';

export const validateForm: (values: StatementRequestFormValues) => Promise<ValidationErrors> | ValidationErrors = validate(
  validationSchema
);
