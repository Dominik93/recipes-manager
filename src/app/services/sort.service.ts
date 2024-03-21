import { Inject, Injectable } from '@angular/core';
import { Selectable } from '../pipes/selected.pipe';
import { ORDER } from '../pipes/sort-selected.pipe';
import { LoggingService } from './logging/logging';
import { Taggable } from '../pipes/sort-tag.pipe';

@Injectable({
  providedIn: 'root'
})
export class SortService {

  constructor(@Inject('LoggingService') private log: LoggingService) { }

  transformTaggable(items: Taggable[]): any[] {
    this.log.trace("SortService::transformTaggable");
    if (!items) {
      return items;
    }
    const sortedItems = items.sort((i1, i2) => {
      return i1.tag > i2.tag ? -1 : 1;
    })

    this.log.trace('SortSelectedPipe::transformTaggable sorted items', items);
    return sortedItems;
  }

  transformSelectable(items: Selectable[], order: ORDER = 'ASC'): any[] {
    this.log.trace('SortSelectedPipe::transformSelectable by', order);

    if (!items) {
      return items;
    }

    const sortedItems = items.sort((i1, i2) => {
      if (order === 'ASC') return this.asc(i1.selected, i2.selected);
      if (order === 'DESC') return this.desc(i1.selected, i2.selected);
      return this.asc(i1.selected, i2.selected);
    });

    this.log.trace('SortSelectedPipe::transformSelectable sorted items', items);
    return sortedItems;
  }

  private asc(a: boolean, b: boolean) {
    return Number(a) - Number(b);
  }

  private desc(a: boolean, b: boolean) {
    return Number(b) - Number(a);
  }

}
