import type { FC } from 'react';
import React, { useCallback } from 'react';
import { locale } from 'localization';
import { ACTIONS, Adjust, Box, Pattern, PrimaryButton, Typography } from '@platform/ui';
import { Assets } from './assets';
import css from './styles.scss';

/** Банер оценки сервиса. */
export const ServiceEvaluation: FC = () => {
  /** Переход на опрос оценки сервиса. */
  const handleForward = useCallback(() => {
    window.open('https://oprosso.net/p/dJYqd8eT5QwXG3scR', '_blank');
  }, []);

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
