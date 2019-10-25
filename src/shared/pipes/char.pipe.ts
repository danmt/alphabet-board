import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'char'
})
export class CharPipe implements PipeTransform {
  transform(keyCode: number) {
    return String.fromCharCode(keyCode);
  }
}
