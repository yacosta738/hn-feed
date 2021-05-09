import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from "@angular/common";

@Pipe({
  name: 'postDate'
})
export class PostDatePipe implements PipeTransform {

  transform(value: Date | string | number): string | null {
    const isToday = (date: Date) => {
      const today = new Date()
      return date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();
    };
    const postDate = new Date(value);

    const isYesterday = (date: Date) => {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1);
      return date.getDate() === yesterday.getDate() &&
        date.getMonth() === yesterday.getMonth() &&
        date.getFullYear() === yesterday.getFullYear();
    }

    const format = isToday(postDate) ? 'h:mm a' : isYesterday(postDate) ? 'yesterday' : 'MMM, d';
    if (format === 'yesterday') return format;
    const pipe = new DatePipe('en-US'); // Use your own locale
    return pipe.transform(value, format);
  }

}
