import  {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'take'})
export class TakePipe implements PipeTransform {
  transform(values: Array<any>, key: number): Array<any> {
    if (!values || !values.length) {
      return values;
    }

    return values.slice(0, key);
  }
}
