/* eslint-disable */
// prettier-ignore
/* This file is autogenerated! Don't modify it directrly! */
import { translate } from "@platform/tools/localization";
export const t = (key: string, params?: any) => translate('statement', key, params);

export default {
	client: {
		statementStatuses: {
			/**
			 * @ru
			 * Запрос сформирован
			 */
			get new() {
				return t('client.statementStatuses.new');
			},
			/**
			 * @ru
			 * Отправлен
			 */
			get delivered() {
				return t('client.statementStatuses.delivered');
			},
			/**
			 * @ru
			 * Доставлен
			 */
			get detailsValid() {
				return t('client.statementStatuses.detailsValid');
			},
			/**
			 * @ru
			 * Доставлен
			 */
			get received() {
				return t('client.statementStatuses.received');
			},
			/**
			 * @ru
			 * Исполнен
			 */
			get executed() {
				return t('client.statementStatuses.executed');
			},
			/**
			 * @ru
			 * Отклонен
			 */
			get denied() {
				return t('client.statementStatuses.denied');
			},
		},
		scroller: {
			/**
			 * @ru
			 * Выписки
			 */
			get title() {
				return t('client.scroller.title');
			},
		},
		form: {
			/**
			 * @ru
			 * Клиентская форма
			 */
			get title() {
				return t('client.form.title');
			},
		},
	},
	scroller: {
		tags: {
			labels: {
				/**
				 * @ru
				 * Сбросить всё
				 */
				get resetAll() {
					return t('scroller.tags.labels.resetAll');
				},
			},
		},
		navTabs: {
			labels: {
				/**
				 * @ru
				 * Обороты
				 */
				get turnover() {
					return t('scroller.navTabs.labels.turnover');
				},
				/**
				 * @ru
				 * История запросов
				 */
				get history() {
					return t('scroller.navTabs.labels.history');
				},
			},
		},
		filter: {
			buttons: {
				/**
				 * @ru
				 * Показать фильтры
				 */
				get expand() {
					return t('scroller.filter.buttons.expand');
				},
				/**
				 * @ru
				 * Скрыть фильтры
				 */
				get collapse() {
					return t('scroller.filter.buttons.collapse');
				},
				/**
				 * @ru
				 * Применить фильтры
				 */
				get applyFilters() {
					return t('scroller.filter.buttons.applyFilters');
				},
				/**
				 * @ru
				 * Сбросить
				 */
				get reset() {
					return t('scroller.filter.buttons.reset');
				},
			},
		},
		pagination: {
			/**
			 * @ru
			 * Отображать по:
			 */
			get displayBy() {
				return t('scroller.pagination.displayBy');
			},
		},
	},
	transactionsScroller: {
		/**
		 * @ru
		 * Выписка c {dateFrom} по {dateTo}
		 */
		title: (p: { dateFrom: string; dateTo: string }) => t('transactionsScroller.title', p),
		placeholder: {
			/**
			 * @ru
			 * Поиск по таблице
			 */
			get tableSearch() {
				return t('transactionsScroller.placeholder.tableSearch');
			},
			/**
			 * @ru
			 * Сумма от
			 */
			get amountFrom() {
				return t('transactionsScroller.placeholder.amountFrom');
			},
			/**
			 * @ru
			 * Сумма по
			 */
			get amountTo() {
				return t('transactionsScroller.placeholder.amountTo');
			},
		},
		labels: {
			/**
			 * @ru
			 * Номер документа
			 */
			get docNumber() {
				return t('transactionsScroller.labels.docNumber');
			},
			/**
			 * @ru
			 * Дата платежа
			 */
			get date() {
				return t('transactionsScroller.labels.date');
			},
			/**
			 * @ru
			 * Операция
			 */
			get transactionType() {
				return t('transactionsScroller.labels.transactionType');
			},
			/**
			 * @ru
			 * Контрагент
			 */
			get counterparty() {
				return t('transactionsScroller.labels.counterparty');
			},
			/**
			 * @ru
			 * ИНН: {inn}
			 */
			counterpartyInn: (p: { inn: string }) => t('transactionsScroller.labels.counterpartyInn', p),
		},
		tags: {
			/**
			 * @ru
			 * Номер документа:
			 */
			get docNumber() {
				return t('transactionsScroller.tags.docNumber');
			},
			/**
			 * @ru
			 * Дата запроса c:
			 */
			get dateFrom() {
				return t('transactionsScroller.tags.dateFrom');
			},
			/**
			 * @ru
			 * Дата запроса по:
			 */
			get dateTo() {
				return t('transactionsScroller.tags.dateTo');
			},
			/**
			 * @ru
			 * Операция:
			 */
			get transactionType() {
				return t('transactionsScroller.tags.transactionType');
			},
			/**
			 * @ru
			 * Контрагент:
			 */
			get counterparty() {
				return t('transactionsScroller.tags.counterparty');
			},
		},
	},
	historyScroller: {
		filter: {
			placeholders: {
				/**
				 * @ru
				 * Счета
				 */
				get accounts() {
					return t('historyScroller.filter.placeholders.accounts');
				},
			},
			labels: {
				/**
				 * @ru
				 * Дата запроса
				 */
				get date() {
					return t('historyScroller.filter.labels.date');
				},
				/**
				 * @ru
				 * Организация
				 */
				get organization() {
					return t('historyScroller.filter.labels.organization');
				},
				/**
				 * @ru
				 * Статус
				 */
				get status() {
					return t('historyScroller.filter.labels.status');
				},
				/**
				 * @ru
				 * Электронная подпись
				 */
				get signaturePresence() {
					return t('historyScroller.filter.labels.signaturePresence');
				},
				/**
				 * @ru
				 * Тип периода
				 */
				get datePeriod() {
					return t('historyScroller.filter.labels.datePeriod');
				},
			},
		},
		tags: {
			labels: {
				/**
				 * @ru
				 * Организация:
				 */
				get organization() {
					return t('historyScroller.tags.labels.organization');
				},
				/**
				 * @ru
				 * Статус:
				 */
				get status() {
					return t('historyScroller.tags.labels.status');
				},
				/**
				 * @ru
				 * Есть электронная подпись
				 */
				get signaturePresence() {
					return t('historyScroller.tags.labels.signaturePresence');
				},
				/**
				 * @ru
				 * Тип периода:
				 */
				get datePeriod() {
					return t('historyScroller.tags.labels.datePeriod');
				},
			},
		},
		headers: {
			/**
			 * @ru
			 * Дата запроса
			 */
			get createdAt() {
				return t('historyScroller.headers.createdAt');
			},
			/**
			 * @ru
			 * Счёт
			 */
			get accountNumber() {
				return t('historyScroller.headers.accountNumber');
			},
			/**
			 * @ru
			 * Период
			 */
			get period() {
				return t('historyScroller.headers.period');
			},
			/**
			 * @ru
			 * Формат
			 */
			get statementFormat() {
				return t('historyScroller.headers.statementFormat');
			},
			/**
			 * @ru
			 * Статус
			 */
			get status() {
				return t('historyScroller.headers.status');
			},
		},
		table: {
			/**
			 * @ru
			 * Запросы
			 */
			get total() {
				return t('historyScroller.table.total');
			},
			/**
			 * @ru
			 * {exists} из {total}
			 */
			totalValue: (p: { total: number; exists: number }) => t('historyScroller.table.totalValue', p),
			/**
			 * @ru
			 * У вас пока не было запросов выписки
			 */
			get placeholder() {
				return t('historyScroller.table.placeholder');
			},
			/**
			 * @ru
			 * Все счета всех организаций
			 */
			get allAccounts() {
				return t('historyScroller.table.allAccounts');
			},
			/**
			 * @ru
			 * +{value}
			 */
			prefixedByPlus: (p: { value: number }) => t('historyScroller.table.prefixedByPlus', p),
			/**
			 * @ru
			 * {dateFrom}–{dateTo}
			 */
			separatedByDashes: (p: { dateFrom: string; dateTo: string }) => t('historyScroller.table.separatedByDashes', p),
		},
		period: {
			labels: {
				/**
				 * @ru
				 * За период
				 */
				get selectPeriod() {
					return t('historyScroller.period.labels.selectPeriod');
				},
				/**
				 * @ru
				 * За вчера
				 */
				get yesterday() {
					return t('historyScroller.period.labels.yesterday');
				},
				/**
				 * @ru
				 * За сегодня
				 */
				get today() {
					return t('historyScroller.period.labels.today');
				},
				/**
				 * @ru
				 * За последние 3 дня
				 */
				get last3Days() {
					return t('historyScroller.period.labels.last3Days');
				},
				/**
				 * @ru
				 * За текущий месяц
				 */
				get currentMonth() {
					return t('historyScroller.period.labels.currentMonth');
				},
				/**
				 * @ru
				 * За прошлый месяц
				 */
				get lastMonth() {
					return t('historyScroller.period.labels.lastMonth');
				},
				/**
				 * @ru
				 * За предыдущий квартал
				 */
				get previousQuarter() {
					return t('historyScroller.period.labels.previousQuarter');
				},
			},
		},
		statementFormat: {
			labels: {
				/**
				 * @ru
				 * На экране
				 */
				get onScreen() {
					return t('historyScroller.statementFormat.labels.onScreen');
				},
				/**
				 * @ru
				 * 1С
				 */
				get c1() {
					return t('historyScroller.statementFormat.labels.c1');
				},
				/**
				 * @ru
				 * TXT
				 */
				get txt() {
					return t('historyScroller.statementFormat.labels.txt');
				},
				/**
				 * @ru
				 * PDF
				 */
				get pdf() {
					return t('historyScroller.statementFormat.labels.pdf');
				},
				/**
				 * @ru
				 * RTF
				 */
				get rtf() {
					return t('historyScroller.statementFormat.labels.rtf');
				},
				/**
				 * @ru
				 * EXCEL
				 */
				get excel() {
					return t('historyScroller.statementFormat.labels.excel');
				},
				/**
				 * @ru
				 * XPS
				 */
				get xps() {
					return t('historyScroller.statementFormat.labels.xps');
				},
				/**
				 * @ru
				 * MT940
				 */
				get mt940() {
					return t('historyScroller.statementFormat.labels.mt940');
				},
				/**
				 * @ru
				 * Multicash
				 */
				get multicash() {
					return t('historyScroller.statementFormat.labels.multicash');
				},
			},
		},
	},
	turnoverScroller: {
		filter: {
			tags: {
				/**
				 * @ru
				 * Дата от:
				 */
				get dateFrom() {
					return t('turnoverScroller.filter.tags.dateFrom');
				},
				/**
				 * @ru
				 * Дата до:
				 */
				get dateTo() {
					return t('turnoverScroller.filter.tags.dateTo');
				},
				/**
				 * @ru
				 * Счёт:
				 */
				get accounts() {
					return t('turnoverScroller.filter.tags.accounts');
				},
				/**
				 * @ru
				 * Организация:
				 */
				get organizations() {
					return t('turnoverScroller.filter.tags.organizations');
				},
			},
			labels: {
				/**
				 * @ru
				 * Только действующие счета
				 */
				get onlyActiveAccounts() {
					return t('turnoverScroller.filter.labels.onlyActiveAccounts');
				},
			},
			grouping: {
				/**
				 * @ru
				 * Без группировки
				 */
				get noGrouping() {
					return t('turnoverScroller.filter.grouping.noGrouping');
				},
				/**
				 * @ru
				 * По организациям и валютам
				 */
				get organizationsAndCurrencies() {
					return t('turnoverScroller.filter.grouping.organizationsAndCurrencies');
				},
				/**
				 * @ru
				 * По организациям
				 */
				get organizations() {
					return t('turnoverScroller.filter.grouping.organizations');
				},
				/**
				 * @ru
				 * По валютам
				 */
				get currencies() {
					return t('turnoverScroller.filter.grouping.currencies');
				},
				/**
				 * @ru
				 * По подразделениям
				 */
				get branches() {
					return t('turnoverScroller.filter.grouping.branches');
				},
				/**
				 * @ru
				 * По типу счета
				 */
				get accountType() {
					return t('turnoverScroller.filter.grouping.accountType');
				},
			},
			datePeriods: {
				/**
				 * @ru
				 * Выбрать период
				 */
				get selectPeriod() {
					return t('turnoverScroller.filter.datePeriods.selectPeriod');
				},
				/**
				 * @ru
				 * Вчера
				 */
				get yesterday() {
					return t('turnoverScroller.filter.datePeriods.yesterday');
				},
				/**
				 * @ru
				 * Сегодня
				 */
				get today() {
					return t('turnoverScroller.filter.datePeriods.today');
				},
				/**
				 * @ru
				 * Последние 3 дня
				 */
				get last3Days() {
					return t('turnoverScroller.filter.datePeriods.last3Days');
				},
				/**
				 * @ru
				 * Текущий месяц
				 */
				get curMonth() {
					return t('turnoverScroller.filter.datePeriods.curMonth');
				},
				/**
				 * @ru
				 * Прошлый месяц
				 */
				get lastMonth() {
					return t('turnoverScroller.filter.datePeriods.lastMonth');
				},
				/**
				 * @ru
				 * Предыдущий квартал
				 */
				get prevQuarter() {
					return t('turnoverScroller.filter.datePeriods.prevQuarter');
				},
			},
		},
		groupInfo: {
			/**
			 * @ru
			 * Организации
			 */
			get organizations() {
				return t('turnoverScroller.groupInfo.organizations');
			},
			/**
			 * @ru
			 * Валюты
			 */
			get currencies() {
				return t('turnoverScroller.groupInfo.currencies');
			},
			/**
			 * @ru
			 * Подразделения
			 */
			get branches() {
				return t('turnoverScroller.groupInfo.branches');
			},
			/**
			 * @ru
			 * Типов счетов
			 */
			get accountType() {
				return t('turnoverScroller.groupInfo.accountType');
			},
			/**
			 * @ru
			 * Cчетов
			 */
			get noGrouping() {
				return t('turnoverScroller.groupInfo.noGrouping');
			},
		},
		headers: {
			/**
			 * @ru
			 * Организация
			 */
			get organization() {
				return t('turnoverScroller.headers.organization');
			},
			/**
			 * @ru
			 * Номер счета
			 */
			get accountNumber() {
				return t('turnoverScroller.headers.accountNumber');
			},
			/**
			 * @ru
			 * Входящий остаток
			 */
			get incomingBalance() {
				return t('turnoverScroller.headers.incomingBalance');
			},
			/**
			 * @ru
			 * Расход
			 */
			get outcome() {
				return t('turnoverScroller.headers.outcome');
			},
			/**
			 * @ru
			 * Приход
			 */
			get income() {
				return t('turnoverScroller.headers.income');
			},
			/**
			 * @ru
			 * Исходящий остаток
			 */
			get outgoingBalance() {
				return t('turnoverScroller.headers.outgoingBalance');
			},
		},
		buttons: {
			/**
			 * @ru
			 * * "rowsAmount === 4" - Все {rowsAmount} счета
			 * * "true" - Все {rowsAmount} счетов
			 */
			expandRows: (p: { rowsAmount: number }) => t('turnoverScroller.buttons.expandRows', p),
			/**
			 * @ru
			 * Скрыть счета
			 */
			get collapseRows() {
				return t('turnoverScroller.buttons.collapseRows');
			},
			/**
			 * @ru
			 * Скрыть валюты
			 */
			get hideTotals() {
				return t('turnoverScroller.buttons.hideTotals');
			},
			/**
			 * @ru
			 * Все валюты
			 */
			get showTotals() {
				return t('turnoverScroller.buttons.showTotals');
			},
		},
		/**
		 * @ru
		 * Счета не найдены
		 */
		get tablePlaceholder() {
			return t('turnoverScroller.tablePlaceholder');
		},
	},
	moneyString: {
		/**
		 * @ru
		 * {amount, money} {currencyCode}
		 */
		unsigned: (p: { amount: number; currencyCode: string }) => t('moneyString.unsigned', p),
		/**
		 * @ru
		 * -{amount, money} {currencyCode}
		 */
		negative: (p: { amount: number; currencyCode: string }) => t('moneyString.negative', p),
		/**
		 * @ru
		 * +{amount, money} {currencyCode}
		 */
		positive: (p: { amount: number; currencyCode: string }) => t('moneyString.positive', p),
	},
	admin: {
		form: {
			/**
			 * @ru
			 * Админская форма
			 */
			get title() {
				return t('admin.form.title');
			},
		},
		scroller: {
			/**
			 * @ru
			 * Админский скроллер
			 */
			get title() {
				return t('admin.scroller.title');
			},
		},
	},
	action: {
		labels: {
			/**
			 * @ru
			 * Запросить выписку
			 */
			get createStatement() {
				return t('action.labels.createStatement');
			},
		},
	},
	accountType: {
		labels: {
			/**
			 * @ru
			 * Расчётный
			 */
			get checking() {
				return t('accountType.labels.checking');
			},
			/**
			 * @ru
			 * Счёт исполнителя ГК
			 */
			get goz() {
				return t('accountType.labels.goz');
			},
			/**
			 * @ru
			 * Счёт головного исполнителя ГК
			 */
			get mainGoz() {
				return t('accountType.labels.mainGoz');
			},
			/**
			 * @ru
			 * Счёт участника закупок
			 */
			get participant() {
				return t('accountType.labels.participant');
			},
		},
	},
	form: {
		labels: {
			/**
			 * @ru
			 * Все
			 */
			get selectAll() {
				return t('form.labels.selectAll');
			},
		},
		placeholder: {
			/**
			 * @ru
			 * дд.мм.гггг
			 */
			get date() {
				return t('form.placeholder.date');
			},
		},
		newRequestStatement: {
			/**
			 * @ru
			 * Запрос выписки
			 */
			get title() {
				return t('form.newRequestStatement.title');
			},
		},
		buttons: {
			download: {
				/**
				 * @ru
				 * Скачать
				 */
				get label() {
					return t('form.buttons.download.label');
				},
			},
			sendToEmail: {
				/**
				 * @ru
				 * Отправить на почту
				 */
				get label() {
					return t('form.buttons.sendToEmail.label');
				},
			},
			show: {
				/**
				 * @ru
				 * Показать на экране
				 */
				get label() {
					return t('form.buttons.show.label');
				},
			},
			print: {
				/**
				 * @ru
				 * Печать
				 */
				get label() {
					return t('form.buttons.print.label');
				},
			},
			cancel: {
				/**
				 * @ru
				 * Отменить
				 */
				get label() {
					return t('form.buttons.cancel.label');
				},
			},
		},
	},
	transactionType: {
		labels: {
			/**
			 * @ru
			 * Поступления
			 */
			get income() {
				return t('transactionType.labels.income');
			},
			/**
			 * @ru
			 * Списания
			 */
			get outcome() {
				return t('transactionType.labels.outcome');
			},
		},
	},
	common: {
		period: {
			/**
			 * @ru
			 * Период
			 */
			get label() {
				return t('common.period.label');
			},
		},
		accounts: {
			/**
			 * @ru
			 * Счёт
			 */
			get label() {
				return t('common.accounts.label');
			},
		},
		operations: {
			/**
			 * @ru
			 * Операции
			 */
			get label() {
				return t('common.operations.label');
			},
			/**
			 * @ru
			 * Все
			 */
			get ALL() {
				return t('common.operations.ALL');
			},
			/**
			 * @ru
			 * Поступления
			 */
			get INCOME() {
				return t('common.operations.INCOME');
			},
			/**
			 * @ru
			 * Списания
			 */
			get OUTCOME() {
				return t('common.operations.OUTCOME');
			},
		},
		fileFormat: {
			/**
			 * @ru
			 * Формат файла
			 */
			get label() {
				return t('common.fileFormat.label');
			},
			/**
			 * @ru
			 * 1С
			 */
			get C1() {
				return t('common.fileFormat.C1');
			},
			/**
			 * @ru
			 * Текст
			 */
			get TXT() {
				return t('common.fileFormat.TXT');
			},
			/**
			 * @ru
			 * PDF
			 */
			get PDF() {
				return t('common.fileFormat.PDF');
			},
			/**
			 * @ru
			 * Excel
			 */
			get EXCEL() {
				return t('common.fileFormat.EXCEL');
			},
		},
		creationParams: {
			/**
			 * @ru
			 * Параметры
			 */
			get label() {
				return t('common.creationParams.label');
			},
			/**
			 * @ru
			 * Отдельным файлом по каждому счёту
			 */
			get separateAccountsFiles() {
				return t('common.creationParams.separateAccountsFiles');
			},
			/**
			 * @ru
			 * Скрыть нулевые обороты
			 */
			get hideEmptyTurnovers() {
				return t('common.creationParams.hideEmptyTurnovers');
			},
			/**
			 * @ru
			 * С электронной подписью банка в формате PDF
			 */
			get withSign() {
				return t('common.creationParams.withSign');
			},
			/**
			 * @ru
			 * С комплектом документов
			 */
			get withDocumentsSet() {
				return t('common.creationParams.withDocumentsSet');
			},
		},
		documentsSetParams: {
			/**
			 * @ru
			 * Комплект документов
			 */
			get label() {
				return t('common.documentsSetParams.label');
			},
			/**
			 * @ru
			 * Отдельными файлами
			 */
			get separateDocumentsFiles() {
				return t('common.documentsSetParams.separateDocumentsFiles');
			},
			/**
			 * @ru
			 * Только документы выписки
			 */
			get onlyRequestStatementDocuments() {
				return t('common.documentsSetParams.onlyRequestStatementDocuments');
			},
		},
		debitParams: {
			/**
			 * @ru
			 * Дебетовые
			 */
			get label() {
				return t('common.debitParams.label');
			},
			/**
			 * @ru
			 * Документы выписки
			 */
			get includeStatements() {
				return t('common.debitParams.includeStatements');
			},
			/**
			 * @ru
			 * Документы основания
			 */
			get includeOrders() {
				return t('common.debitParams.includeOrders');
			},
		},
		creditParams: {
			/**
			 * @ru
			 * Кредитные
			 */
			get label() {
				return t('common.creditParams.label');
			},
			/**
			 * @ru
			 * Документы выписки
			 */
			get includeStatements() {
				return t('common.creditParams.includeStatements');
			},
			/**
			 * @ru
			 * Документы основания
			 */
			get includeOrders() {
				return t('common.creditParams.includeOrders');
			},
		},
		email: {
			/**
			 * @ru
			 * Адрес электронной почты
			 */
			get label() {
				return t('common.email.label');
			},
		},
	},
};
