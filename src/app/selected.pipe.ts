import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'selected',
  standalone: true
})
export class SelectedPipe implements PipeTransform {

  transform(items: any[], filter: boolean): any {
    if (!items || !filter) {
        return items;
    }
    return items.filter(item => this.isSelected(item, filter));
  }

  private isSelected(item: any, filter: boolean) {
    return item.selected === filter;
  }

}
