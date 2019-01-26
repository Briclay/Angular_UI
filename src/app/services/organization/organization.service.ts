import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { constantService } from '../../constant/constant.serive';
import { OrganizationData } from '../../interfaces/interfaces';
import { ApiService } from "./../api.service";
import { environmentService } from "./../../constant/environment";
import { map } from 'rxjs/operators';

const history = {
	"result": "success",
    "data": [
		{
			username: 'username1',
			changedBy: 'Admin',
			changedDate: '01/12/2017'
		},
		{
			username: 'username1',
			changedBy: 'Admin',
			changedDate: '01/12/2017'
		},
		{
			username: 'username1',
			changedBy: 'Admin',
			changedDate: '01/12/2017'
		}
	]
}

@Injectable()	
export class OrganizationService {
    constructor(
	    private apiService: ApiService,
    ) { }
    // pass params data

	public getHistory(): Observable<any> {
		return of(history)
	}

	public getFeature (): Observable<any> {
        let url = `${environmentService.briclayCore}/features?select=*`;
        return this.apiService.get(url).pipe(map(res => res));
    }

	public getAll(id): Observable<any> {
        let url = `${environmentService.briclayCore}/organisations?select=*`;
        return this.apiService.get(url).pipe(map(res => res));
    }
    
    public getOne(id): Observable<any> {
        let url =  `${environmentService.briclayCore}/organisations/${id}`;
        return this.apiService.get(url, id).pipe(map(res => res));
    }
   
    public organisations (request): Observable<any> {
        let url = `${environmentService.briclayCore}/organisations`;
        return this.apiService.post(url, request).pipe(map(res => res));
    }

    public update (id, request): Observable<any> {
        let url = `${environmentService.briclayCore}/organisations/${id}`;
        return this.apiService.put(url, request).pipe(map(res => res));
    }

    getS3Url(query: string, request?): Observable<any> {
	    let url = `${environmentService.briclayCore}/file/sign-s3?${query}`
        return this.apiService.put(url, request).pipe(map(res => res));
    }

   /* getS3Url(query: string): Observable<any> {
	    let url = `/file/sign-s3?${query}`
>>>>>>> origin/Sonal_Changes
	    return this.apiService.get(url).pipe(map(res => res));
    }*/

   /* public deleteOrg (request): Observable<any> {
        let url = "https://briclay-core.herokuapp.com/organisations/5a58438f734d1d61613f6ed9";
        return this.apiService.get(url, request).pipe(map(res => res));
    }*/
}

