import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(items: any[], value: string): any {
    if (!items || !value || value === "") {
        return items;
    }
    return items.filter(item => this.contains(item, value));
  }

  private contains(item: any, value: string) {
    return item.name.toLowerCase().includes(value.toLowerCase());
  }
}
