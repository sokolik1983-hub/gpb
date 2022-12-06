import type { ValidationErrors } from 'final-form';
import { scheduleRequestValidationSchema } from 'utils/client';
import { statementRequestValidationSchema } from 'utils/common';
import { validate } from '@platform/validation';

export const validateForm: (values: unknown) => Promise<ValidationErrors> | ValidationErrors = validate(statementRequestValidationSchema);
export const validateScheduleForm: (values: unknown) => Promise<ValidationErrors> | ValidationErrors = validate(
  scheduleRequestValidationSchema
);
