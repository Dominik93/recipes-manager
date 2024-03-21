import { Pipe, PipeTransform } from '@angular/core';
import { SortService } from '../services/sort.service';


export interface Taggable {
  tag: string;
}

@Pipe({
  name: 'sortTag',
  standalone: true
})
export class SortTagPipe implements PipeTransform {

  constructor(private sortService: SortService) { }

  transform(items: Taggable[]): any[] {
    return this.sortService.transformTaggable(items);
  }
}
