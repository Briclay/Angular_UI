import  {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
  transform(value: Array<any>, key?: any, reverse?: boolean): any {

    return value.sort();
  }
}
