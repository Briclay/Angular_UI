import {Inject, LOCALE_ID, Pipe, PipeTransform} from '@angular/core';
//import {formatNumber} from '@angular/common'
import {DecimalPipe} from '@angular/common'

@Pipe({
  name: 'prettyNumber'
})
export class PrettyNumberPipe extends DecimalPipe implements PipeTransform {
  //constructor(@Inject(LOCALE_ID) private _locale: string) {}

  /**
   * @param value a number to be formatted.
   * @param digitsInfo a `string` which has a following format: <br>
   * <code>{minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}</code>.
   *   - `minIntegerDigits` is the minimum number of integer digits to use. Defaults to `1`.
   *   - `minFractionDigits` is the minimum number of digits after the decimal point. Defaults to
   * `0`.
   *   - `maxFractionDigits` is the maximum number of digits after the decimal point. Defaults to
   * `3`.
   * default).
   * @param emptyLabel label users for empty/NaN values
   */
  transform(value: any, digitsInfo?: string, emptyLabel?: string): string|null {
    if (isEmpty(value)) return emptyLabel;

    try {
      let num = strToNumber(value);
      if(isFinite(num)) {
        const matches = /^(\d)*-(\d)*\.(\d)*-(\d)*$/.exec(digitsInfo);
        if (matches != null) {
          let maxIntegerDigits = parseInt(matches[2]);
          // TODO: also handle very small numbers
          let digits = Math.floor(Math.log10(num)) + 1;
          let exponentString = "";
          if (digits > maxIntegerDigits) {
            let exponent = digits - 1;
            num = num / Math.pow(10, exponent);
            exponentString = "E+" + exponent;
          }
          digitsInfo = (matches[1] == null ? "" : matches[1]) + "." + (matches[3] == null ? "" : matches[3]) + "-" + (matches[4] == null ? "" : matches[4]);
          return super.transform(num, digitsInfo, "en-US").replace(",","") + exponentString;
        }
      }
      return super.transform(num, digitsInfo, "en-US").replace(",","");
    } catch (error) {
      throw error; // TODO handle this maybe
    }
  }

}

function isEmpty(value: any): boolean {
  return value == null || value === '' || value !== value;
}

/**
 * Transforms a string into a number (if needed)
 */
function strToNumber(value: number | string): number {
  // Convert strings to numbers
  if (typeof value === 'string' && !isNaN(Number(value) - parseFloat(value))) {
    return Number(value);
  }
  if (typeof value !== 'number') {
    throw new Error(`${value} is not a number`);
  }
  return value;
}
