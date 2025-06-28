import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customurl'
})
export class CustomurlPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
