import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from "./../api.service";
import { environmentService } from "./../../constant/environment";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FeatureService {
    constructor(
	    private apiService: ApiService,
    ) { }

    public getFeatures(): Observable<any> {
        let url = `${environmentService.briclayCore}/features`
        return this.apiService.get(url).pipe(map(res     => res));
    }
}