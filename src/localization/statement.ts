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
				 * Электронная
				 *  подпись
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
				 * Только активные счета
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
	},
};
