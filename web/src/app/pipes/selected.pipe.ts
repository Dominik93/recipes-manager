import { Pipe, PipeTransform } from '@angular/core';

export interface Selectable {
  selected: boolean;
}


@Pipe({
  name: 'selected',
  standalone: true
})
export class SelectedPipe implements PipeTransform {

  transform(items: Selectable[], selected: boolean): any {
    if (!items || !selected) {
      return items;
    }
    return items.filter(item => this.isSelected(item, selected));
  }

  private isSelected(item: Selectable, selected: boolean) {
    return item.selected === selected;
  }

}
