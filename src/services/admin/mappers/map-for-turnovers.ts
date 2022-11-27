import type { TurnoverCard } from 'interfaces/admin/dto/turnover';
import { guid } from '@platform/tools/istore';

/** Маппер для преобразования ответа АПИ в приемлемый для скроллера остатков и оборотов вид. */
export const mapForTurnovers = (items: TurnoverCard[]): TurnoverCard[] =>
  items.map(x => ({
    ...x,
    id: guid(),
  }));
