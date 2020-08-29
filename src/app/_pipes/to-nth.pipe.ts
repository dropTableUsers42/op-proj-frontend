import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toNth'
})
export class ToNthPipe implements PipeTransform {

  transform(value: number): string {
    if(isNaN(value))
    {
      return NaN.toString();
    }
    if(value == 1)
    {
      return '1st';
    }
    else if(value == 2)
    {
      return '2nd';
    }
    else if(value == 3)
    {
      return '3rd';
    }
    else
    {
      return value + 'th';
    }
  }

}