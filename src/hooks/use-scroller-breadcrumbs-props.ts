import { locale } from 'localization';
import { COMMON_STREAM_URL } from 'stream-constants/client';
import { useRedirect } from '@platform/services';
import type { IBreadcrumbsProps } from '@platform/ui';

/** Возвращает свойства для хлебны крошек скроллера. */
export const useScrollerBreadcrumbsProps = (): IBreadcrumbsProps => {
  const redirectToMainPage = useRedirect(COMMON_STREAM_URL.MAINPAGE);

  return {
    onHomeClick: redirectToMainPage,
    header: locale.client.scroller.title,
  };
};
