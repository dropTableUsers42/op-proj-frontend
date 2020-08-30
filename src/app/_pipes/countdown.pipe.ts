import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countdown'
})
export class CountdownPipe implements PipeTransform {

  transform(text: string, args: number): number {
    let maxLength = args || 0;
    let length = text.length;

    return maxLength - length;
  }

}
