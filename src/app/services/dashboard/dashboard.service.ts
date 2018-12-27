import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

// import { ApiService } from '../api.service';
import { ChartData } from '../../interfaces/interfaces';

@Injectable()
export class DashboardService {
    lineChartData: ChartData[] = [
        {
            name: 'COMBO2',
            color: '#1967d2',
            values: [
                {date: '2018-11-27', value: 23.93},
                {date: '2018-11-28', value: 16.89},
                {date: '2018-11-29', value: 7.16},
                {date: '2018-11-30', value: 9.92}
            ]
        },
        {
            name: 'AUTOCOMBO',
            color: '#ea4335',
            values: [
                {date: '2018-11-27', value: 45.86},
                {date: '2018-11-28', value: 12.86},
                {date: '2018-11-29', value: 32.75},
                {date: '2018-11-30', value: 5.64}
            ]
        },
        {
            name: 'AIRLKFULLPT',
            color: '#fbbc05',
            values: [
                {date: '2018-11-27', value: 10.72},
                {date: '2018-11-28', value: 40.61},
                {date: '2018-11-29', value: 23.76},
                {date: '2018-11-30', value: 21.60}
            ]
        },
        {
            name: 'COMBO',
            color: '#34a853',
            values: [
                {date: '2018-11-27', value: 4.71},
                {date: '2018-11-28', value: 24.55},
                {date: '2018-11-29', value: 33.58},
                {date: '2018-11-30', value: 22.61}
            ]
        }
    ];
    
    constructor(
    ) { }

    public getData(): Observable<ChartData[]>  {
        return of(this.lineChartData);
    }
}
