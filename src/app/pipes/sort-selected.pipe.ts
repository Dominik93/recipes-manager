import { Pipe, PipeTransform } from '@angular/core';
import { SortService } from '../services/sort.service';

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

  constructor(private sortService: SortService) { }

  transform(items: Selectable[], order: ORDER = 'ASC'): any[] {
    return this.sortService.transformSelectable(items, order);
  }

}
