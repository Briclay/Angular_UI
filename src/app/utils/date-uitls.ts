declare var moment: any;
export class DateUtils {
  static DATE_FORMAT = "YYYY-MM-DD HH:mm:ss";

  static unixTimestampToDate(ts: number | string) {
    return moment.unix(ts).toDate();
  }

  /**
   *
   * @param date {Date}
   * @param format {string} Default: "YYYY-MM-DD HH:mm:ss"
   * @param toLocaleDateTime {boolean} Default: "false"
   * @returns {string} as per format
   */

  static formatDateTimeString(date: string | Date, format = this.DATE_FORMAT, toLocaleDateTime = false): string {
    if (!date) {
      throw new Error( "Date is not defined in this DateUtils.toLocaleDateTime");
    }

    if (!toLocaleDateTime) {
      return moment(date).format(format);
    }
    return moment.utc(date).local().format(format);
  }

  static subtractDate(unit: number, amount: string|number, fromDate: string = moment(), format = this.DATE_FORMAT ): string {
    if ((unit || unit === 0) && amount) {
      return moment(fromDate).subtract(unit, amount).format(format);
    }

    throw new Error( "unit or amount are not defined in this DateUtils.subtractDate");
  }

  static getPreviousDates(days: number | Date, format = this.DATE_FORMAT): string {
    return moment().subtract(days, 'd').format(format);
  }
  static formatDatetime(d:Date):string {
    d = new Date(d.getTime() + d.getTimezoneOffset()*60*1000);

    var month = '' + (d.getMonth() + 1);
    var day = '' + d.getDate();
    var year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    var hour = '' + d.getHours();
    var minute = '' + d.getMinutes();
    var second = '' + d.getSeconds();

    if (hour.length < 2) hour = '0' + hour;
    if (minute.length < 2) minute = '0' + minute;
    if (second.length < 2) second = '0' + second;

    return [year, month, day].join('-') +" "+ [hour, minute, second].join(':');
  }

  static stringToDate(s:string):Date {
    var d = new Date(s);
    // if it includes time (weird Javascript behaviour)
    if(s.length > 10) {
      d = new Date(d.getTime() - d.getTimezoneOffset() * 60 * 1000);
    }
    return d;
  }

  static addDays(d:Date,days:number):Date {
    var newDate = new Date(d.valueOf());
    newDate.setDate(d.getDate() + days);
    return newDate;
  }

  static daysBetweenDates( startDate:Date, endDate:Date ):number {
    let one_day_ms=1000*60*60*24;

    let date1_ms = startDate.getTime();
    let date2_ms = endDate.getTime();

    let difference_ms = date2_ms - date1_ms;

    return Math.round(difference_ms/one_day_ms);
  }


}



