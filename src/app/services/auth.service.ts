/*import { Injectable, Inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class MatkraftAuthService {
  public storage: any;

  constructor() {
  }

  getToken() {
    if (!this.storage.token) {
      this.storage.token = window.localStorage.getItem('matAuthToken');
    }

    return this.storage.token;
  }

  set(auth: any): boolean {
    this.storage.token = auth.token;
    window.localStorage.setItem('matAuthToken', this.storage.token);
  }
}
*/