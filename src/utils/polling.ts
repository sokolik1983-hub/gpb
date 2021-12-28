/** Достигнуто максимальное число попыток. */
export const MAX_NUMBER_OF_ATTEMPS_REACHED = 'MAX_NUMBER_OF_ATTEMPS_REACHED';

/** Процесс опроса был остановлен пользователем. */
export const POLLING_WAS_STOPPED_BY_USER = 'POLLING_WAS_STOPPED_BY_USER';

/** Функция взята из платформы и добавлена возможность остановки опросов. */
export const polling = <TJobResult, TArgs extends any[]>(
  job: (...args: TArgs) => Promise<TJobResult>,
  checker: (result: TJobResult) => boolean,
  interval: number,
  maxCount: number = 0
) => {
  let count = 0;
  let isStopped = false;
  let timerId;

  const stopPolling = () => {
    clearTimeout(timerId);
    isStopped = true;
  };

  const pollingFunc = (...args: TArgs): Promise<TJobResult> =>
    new Promise((resolve, reject) => {
      count = count + 1;

      job(...args)
        .then(result => {
          if (checker(result)) {
            resolve(result);
          } else {
            if (maxCount > 0 && count >= maxCount) {
              reject(MAX_NUMBER_OF_ATTEMPS_REACHED);

              return;
            }

            if (isStopped) {
              reject(POLLING_WAS_STOPPED_BY_USER);

              return;
            }

            timerId = setTimeout(() => {
              pollingFunc(...args).then(resolve, reject);
            }, interval);
          }
        })
        .catch(reject);
    });

  return { pollingFunc, stopPolling };
};
