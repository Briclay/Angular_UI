import { Pipe, PipeTransform } from "@angular/core";

interface Arg {
  prop?: string;
  key: string;
}

@Pipe({ name: "search" })
export class SearchPipe implements PipeTransform {

  transform (argumentsData: any[], args?: Arg[]): any[] { // argumentsData = [], args: { prop: '', key: '' }
    if (!argumentsData || argumentsData.length === 1 || !args || !args.length || !args[0].key) {
      return argumentsData;
    }

    if(args.length === 1 && !args[0].prop && typeof argumentsData[0] === 'string') {
      return argumentsData.filter(function (data){
        return data.toLowerCase().indexOf(args[0].key.toLowerCase()) > -1;
      });
    }

    if (typeof argumentsData[0] !== 'object') {
      return argumentsData;
    }

    return argumentsData.filter(function (dataObj) {
      return SearchPipe.isConditionTrue(dataObj, args);
    });
  }

  private static isConditionTrue(data: object, args: Arg[]): boolean {
    let isTrue = true;
    for (let i = 0; i < args.length; i++) {
      if (!args[i].key) continue;

      isTrue = isTrue && data[args[i].prop].toLowerCase().indexOf(args[i].key.toLowerCase()) !== -1;
    }

    return isTrue;
  }
}
