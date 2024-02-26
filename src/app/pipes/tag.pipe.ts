import { Inject, Pipe, PipeTransform } from '@angular/core';
import { Tag } from '../recipe';
import { LoggingService } from '../services/logging/logging';


@Pipe({
  name: 'tagFilter',
  standalone: true
})
export class TagPipe implements PipeTransform {

  constructor(@Inject('LoggingService') private log: LoggingService,) { }

  transform(items: any[], filter: Tag | undefined): any {
    this.log.trace("TagPipe::transform by", filter);
    if (!items || !filter) {
      return items;
    }
    this.log.trace("TagPipe::transform ", items);
    return items.filter(item => item.tags.values.includes(filter));
  }

}
