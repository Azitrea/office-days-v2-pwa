import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minutesPassed',
})
export class MinutesPassedPipe implements PipeTransform {
  transform(value: Date, minutes: number = 15): boolean {
    return (
      new Date().getTime() - value.getTime() < minutes * 1000 * 60 * minutes
    );
  }
}
