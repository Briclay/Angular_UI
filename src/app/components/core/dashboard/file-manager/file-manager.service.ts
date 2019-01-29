import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from "../../../../services/api.service";
import { map } from 'rxjs/operators';
import { environmentService } from "../../../../constant/environment";

@Injectable({
  providedIn: 'root'
})
export class FileManagerService {

  constructor(private apiService: ApiService) { }

  public getAllFolders(query: any): Observable<any> {
    let url = `${environmentService.briclayFileManager}/folder?${query}`
    return this.apiService.get(url).pipe(map(res => res));
  }

  public getFiles(fileId?): Observable<any> {
    let url = `${environmentService.briclayFileManager}/file`
    return this.apiService.get(url).pipe(map(res => res));
  }

  public saveFolder(requestObj): Observable<any> {
    let url = `${environmentService.briclayFileManager}/folder`
    return this.apiService.post(url, requestObj).pipe(map(res => res));
  }

  getSingleFile(fileId): Observable<any> {
    let url = `${environmentService.briclayFileManager}/folder/${fileId}`
    return this.apiService.get(url).pipe(map(res => res));
  }

  shareFile(fileID: string, body: any): Observable<any> {
    let url = `${environmentService.briclayFileManager}/file/share/${fileID}`;
    return this.apiService.put(url, body).pipe(map(res => res));
  }

  shareMail(fileID: string, body: any): Observable<any> {
    let url = `${environmentService.briclayFileManager}/file/send/${fileID}`;
    return this.apiService.put(url, body).pipe(map(res => res));
  }

  getS3Url(query: string): Observable<any> {
    let url = `${environmentService.briclayFileManager}/file/sign-s3?${query}`
    return this.apiService.get(url).pipe(map(res => res));
  }

  saveOnS3(url, file, header): Observable<any> {
    return this.apiService.putFile(url, file, header).pipe(map(res => res));
  }

  saveFile(query: any): Observable<any> {
    let url = `${environmentService.briclayFileManager}/file`
    return this.apiService.post(url, query).pipe(map(res => res));
  }
  updateFile(fileId: string, body: any): Observable<any> {
    let url = `${environmentService.briclayFileManager}/file/${fileId}`;
    return this.apiService.put(url, body).pipe(map(res => res));
  }
  getConfig(query: string): Observable<any> {
    let url = `${environmentService.briclayFileManager}/file-config?${query}`
    return this.apiService.get(url).pipe(map(res => res));
  }

}
