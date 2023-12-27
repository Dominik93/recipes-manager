import { Inject, Pipe, PipeTransform } from '@angular/core';
import { LoggingService } from '../services/logging/logging';

export interface Selectable {
  selected: boolean;
}
export type ORDER = 'ASC' | 'DESC';

@Pipe({
  name: 'sortSelected',
  pure: false,
  standalone: true
})
export class SortSelectedPipe implements PipeTransform {

  constructor(@Inject('LoggingService') private log: LoggingService,) { }

  transform(items: Selectable[], order: ORDER = 'ASC'): any {
    this.log.trace('SortSelectedPipe::transform Sort by', order);

    if (!items) {
      return items;
    }

    const sortedItems = items.sort((i1, i2) => {
      if (order === 'ASC') return this.asc(i1.selected, i2.selected);
      if (order === 'DESC') return this.desc(i1.selected, i2.selected);
      return this.asc(i1.selected, i2.selected);
    });

    this.log.trace('SortSelectedPipe::transform Sorted items', items);
    return sortedItems;
  }

  private asc(a: boolean, b: boolean) {
    return Number(a) - Number(b);
  }

  private desc(a: boolean, b: boolean) {
    return Number(b) - Number(a);
  }

}
