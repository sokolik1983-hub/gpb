const localeServices = require('@platform/services/client/_services.ru.json');
const translation = require('@platform/tools/localization');
const localeRU = require('./dictionaries/account-statement.ru.json');

translation.registerArea('account-statement', () => localeRU);

translation.registerArea('_services', () => localeServices);
