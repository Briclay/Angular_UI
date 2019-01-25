import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from "../../../../services/api.service";
import { environmentService } from "../../../../constant/environment";

@Injectable({
  providedIn: 'root'
})
export class OrganisationService {

  constructor(private apiService: ApiService) { }

  public getOrganization(): Observable<any> {
        let url = `${environmentService.briclayCore}/organisations?select=name&order=createdAt&sort=desc`
        return this.apiService.get(url).pipe(map(res => res));
    }

}
