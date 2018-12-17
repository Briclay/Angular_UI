import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../api.service';
import { constantService } from '../../constant/constant.serive';

@Injectable()
export class ConsistencyReportService {
    constructor(
        private apiService: ApiService,
    ) { }
    // pass params data
    public getUser(product: string, station: string, reportId: string): Observable<any> {
        const url = `${constantService.apiUrlBase}/products/${product}/stations/${station}/consistency-reports/${reportId}/status`;
        return this.apiService.get(url);
    }
}