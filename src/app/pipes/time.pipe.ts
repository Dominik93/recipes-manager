import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time',
  standalone: true
})
export class TimePipe implements PipeTransform {

  transform(value: number): unknown {
    if (value < 0) {
      return "00:00";
    }
    const minutes = Math.floor(value / 60);
    const seconds = value - (minutes * 60);
    return this.addLeadingZero(minutes) + ":" + this.addLeadingZero(seconds)
  }

  addLeadingZero(value: number): string {
    if (value >= 10) {
      return value.toString();
    }
    return "0" + value;
  }

}
