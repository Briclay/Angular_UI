import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from "../../../../services/api.service";

@Injectable({
  providedIn: 'root'
})
export class OrganisationService {

  constructor(private apiService: ApiService) { }

  public getOrganization(): Observable<any> {
        let url = `https://briclay-core.herokuapp.com/organisations?select=name&order=createdAt&sort=desc`
        return this.apiService.get(url).pipe(map(res => res));
    }

}
