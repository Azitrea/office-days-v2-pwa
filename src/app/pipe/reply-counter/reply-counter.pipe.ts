import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replyCounter',
})
export class ReplyCounterPipe implements PipeTransform {
  transform(value: Record<string, string>): string {
    const len = value ? Object.keys(value).length : 0;
    return `${len} user replied`;
  }
}
