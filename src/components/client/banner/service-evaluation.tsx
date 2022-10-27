import type { FC } from 'react';
import React, { useCallback, useState } from 'react';
import { locale } from 'localization';
import { getAppConfigItem } from '@platform/services';
import { useUser } from '@platform/services/client';
import { ACTIONS, Adjust, Box, Gap, Pattern, PrimaryButton, RegularButton, Typography } from '@platform/ui';
import { Assets } from './assets';
import css from './styles.scss';

const SESSION_STORAGE_KEY = 'statementServiceEvaluation';
const CONFIG_KEY = 'statementServiceEvaluation';

/** Банер оценки сервиса. */
export const ServiceEvaluation: FC = () => {
  const { isEnabled, evaluationUrl } = getAppConfigItem(CONFIG_KEY);
  const [disabledUsers, setDisabledUsers] = useState<string[]>(JSON.parse(sessionStorage.getItem(SESSION_STORAGE_KEY) || '[]'));

  const {
    user: { userId },
  } = useUser();

  /** Переход на опрос оценки сервиса. */
  const handleForward = useCallback(() => {
    window.open(evaluationUrl, '_blank');
  }, [evaluationUrl]);

  const handleHide = useCallback(() => {
    setDisabledUsers([...disabledUsers, userId]);
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify([...disabledUsers, userId]));
  }, [disabledUsers, userId]);

  if (!isEnabled || disabledUsers.includes(userId)) {
    return null;
  }

  return (
    <Box className={css['service-evaluation']} fill="FAINT">
      <Adjust className={css['service-evaluation__content']} pad={['XL', null]}>
        <Pattern>
          <Pattern.Span size={9}>
            <Typography.H3 className={css['service-evaluation__title']}>{locale.banner.serviceEvaluation.title}</Typography.H3>
            {[0, 1].map(item => (
              <Typography.PLead key={item}>{locale.banner.serviceEvaluation.text[item]}</Typography.PLead>
            ))}
            <Box className={css['service-evaluation__buttons']}>
              <PrimaryButton extraSmall dataAction={ACTIONS.FORWARD} dimension="SM" onClick={handleForward}>
                {locale.banner.serviceEvaluation.button.forward}
              </PrimaryButton>
              <Gap.XS />
              <RegularButton extraSmall data-action={ACTIONS.CANCEL} dimension="SM" onClick={handleHide}>
                {locale.banner.serviceEvaluation.button.skip}
              </RegularButton>
            </Box>
          </Pattern.Span>
          <Pattern.Span size={3}>
            <Adjust hor="RIGHT">
              <Assets.QRCode />
            </Adjust>
          </Pattern.Span>
        </Pattern>
      </Adjust>
    </Box>
  );
};

ServiceEvaluation.displayName = 'ServiceEvaluation';
