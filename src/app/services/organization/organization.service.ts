import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

// import { ApiService } from '../api.service';
import { OrganizationData } from '../../interfaces/interfaces'

@Injectable({
  providedIn: 'root',
})

export class OrganizationService {
    data = {
        data: [{
            name: 'Organization1',
            type: "admin"
        }]
    };

    public getData(): Observable<OrganizationData> {
        return of(this.data);
    }

}