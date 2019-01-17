import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from "../../../../services/api.service";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileManagerService {

  constructor(private apiService: ApiService) { }

  public getAllFolders(fileId?): Observable<any> {
    let url = `https://briclay-file-manager.herokuapp.com/folder${fileId  ? '/' + fileId : ''}`
    return this.apiService.get(url).pipe(map(res => res));
  }

  public getFiles(fileId?): Observable<any> {
    let url = `https://briclay-file-manager.herokuapp.com/file`
    return this.apiService.get(url).pipe(map(res => res));
  }

  public saveFolder(requestObj): Observable<any> {
    let url = "https://briclay-file-manager.herokuapp.com/folder"
    return this.apiService.post(url, requestObj).pipe(map(res => res));
  }
}
