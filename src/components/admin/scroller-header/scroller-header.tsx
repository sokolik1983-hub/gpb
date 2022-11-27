import React from 'react';
import type { FC } from 'react';
import { PageHeader } from 'components/common';
import type { IButtonAction } from '@platform/ui';
import { Box, Gap, Horizon, LimitWidth, PrimaryButton, RegularButton } from '@platform/ui';

/** Свойства шапки страницы скроллера. */
export interface ScrollerHeaderProps {
  /** Экшены шапки страницы скроллера. */
  actions?: IButtonAction[];
  /** Заголовок кнопки назад. */
  backButtonTitle?: string;
  /** Текст заголовка скроллера. */
  header: string;
  /** Обработчик клика кнопки назад. */
  onBack?(): void;
}

/** Шапка страницы скроллера. */
export const ScrollerHeader: FC<ScrollerHeaderProps> = ({ actions, backButtonTitle, header, onBack }) => (
  <Box.Base>
    <LimitWidth size={LimitWidth.SIZE.AUTO}>
      <Gap.XL />
      <Horizon>
        <PageHeader backButtonTitle={backButtonTitle} header={header} onClick={onBack} />
        <Horizon.Spacer />
        {actions && (
          <Horizon>
            {actions.map(({ disabled, label, name, onClick }, index, arr) => {
              const Button = index === arr.length - 1 ? PrimaryButton : RegularButton;

              return (
                <>
                  <Button key={name} extraSmall data-action={name} dataAction={name} dimension="SM" disabled={disabled} onClick={onClick}>
                    {label}
                  </Button>
                  {index !== arr.length - 1 && <Gap.XS />}
                </>
              );
            })}
          </Horizon>
        )}
      </Horizon>
      <Gap.XL />
    </LimitWidth>
  </Box.Base>
);

ScrollerHeader.displayName = 'ScrollerHeader';
