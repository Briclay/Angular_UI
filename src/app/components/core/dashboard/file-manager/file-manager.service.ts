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
    let url = `https://briclay-file-manager.herokuapp.com/folder${fileId ? '/' + fileId : ''}`
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

  public getSingleFile(requestObj): Observable<any> {
    let url = `https://briclay-file-manager.herokuapp.com/${requestObj.type}/${requestObj._id}`
    return this.apiService.get(url).pipe(map(res => res));
  }

  public shareFile(userID, fileID): Observable<any> {
    let url = `https://briclay-file-manager.herokuapp.com/file/share/${fileID}`;
    let requestObj = {
      "activeFlag": false,
      "sharedByUserId": userID
    }
    return this.apiService.put(url, requestObj).pipe(map(res => res));
  }

  public shareMail(userMail, fileID): Observable<any> {
    let url = `https://briclay-file-manager.herokuapp.com/file/send/${fileID}`;
    let requestObj = {
      "toMail": userMail,
      "message": "text file "
    }
    return this.apiService.put(url, requestObj).pipe(map(res => res));
  }

  getS3Url(query: string): Observable<any> {
    let url = `https://briclay-file-manager.herokuapp.com/file/sign-s3?${query}`
    return this.apiService.get(url).pipe(map(res => res));
  }

  saveFile(query: any): Observable<any>  {
    let url = `https://briclay-file-manager.herokuapp.com/file`
    return this.apiService.post(url, query).pipe(map(res => res));
  }
}
