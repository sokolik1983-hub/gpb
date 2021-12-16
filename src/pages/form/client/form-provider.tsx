import React, { createContext } from 'react';
import type { IFormContext } from 'pages/form/client/interfaces/form-context';

const defaultValue: IFormContext = {};

const FormContext = createContext<IFormContext>({});

export const FormProvider: React.FC = ({ children }) => <FormContext.Provider value={defaultValue}>{children}</FormContext.Provider>;

FormProvider.displayName = 'FormProvider';
