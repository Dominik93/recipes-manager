import { Pipe, PipeTransform } from '@angular/core';
import { SortService } from '../services/sort.service';

export interface CartProduct {
  selected: boolean;
  tag: string;
}

@Pipe({
  name: 'sortCartProduct',
  pure: false,
  standalone: true
})
export class SortCartProductPipe implements PipeTransform {

  constructor(private sortService: SortService) { }

  transform(items: CartProduct[]): any[] {
    const selected = this.sortService.transformTaggable(items.filter(value => value.selected));
    const notSelected = this.sortService.transformTaggable(items.filter(value => !value.selected));
    return notSelected.concat(selected);
  }

}
