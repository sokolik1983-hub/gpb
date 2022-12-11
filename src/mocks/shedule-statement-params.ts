import { locale } from 'localization';

export const exampleScheduleParams = {
  accountNumber: '60123.275.3.007.980',
  creationParams: [],
  creditParams: [],
  debitParams: [],
  documentsSetParams: [],
  email: 'ivanov.a@mail.ru',
  format: 'PDF',
  operations: locale.form.labels.selectAll,
  periodType: locale.common.operations.ALL,
  time: '09:00',
  organizations: locale.common.testData.organization,
  method: locale.client.scheduleMethods.email,
  name: locale.client.scheduleStatementPage.testData.name,
  secondName: locale.client.scheduleStatementPage.testData.secondName,
  surname: locale.client.scheduleStatementPage.testData.surName,
};
