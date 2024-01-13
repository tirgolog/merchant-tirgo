import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'maskedInput' })
export class MaskedInputPipe implements PipeTransform {
  transform(input: string, mask: string): string {
    if (!input || !mask) return input;

    let result = '';
    let inputIndex = 0;

    for (let i = 0; i < mask.length; i++) {
      if (mask[i] === '*') {
        result += input[inputIndex] || '';
        inputIndex++;
      } else {
        result += mask[i];
      }
    }

    return result;
  }
}