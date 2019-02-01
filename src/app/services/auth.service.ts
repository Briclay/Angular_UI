import { Injectable, Inject } from '@angular/core';
import { LocalStorageSchema } from '../schemas/local-storage.schema';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  public storage: any;

  constructor(
    private localStorageSchema: LocalStorageSchema
    ) {

    // set the storage if not
    if (_.isEmpty(this.storage)) { this.storage = {}; }
  }

  getToken() {
    if (!this.storage.token) {
      this.storage.token = window.localStorage.getItem('userAuthToken');
    }
    return this.storage.token;
  }

  set(auth: any): boolean {

    // set token localstorage
    this.storage.token = auth.token;
    window.localStorage.setItem('authToken', JSON.stringify(this.storage.token));

    // set user in localstorage
    this.storage.user = _.pick(auth.userObj, _.keys(this.localStorageSchema.authUser.properties));
    window.localStorage.setItem('authUser',  JSON.stringify(auth.userObj));

    // set organisation in localstorage
    this.storage.organisation = _.pick(auth.userObj._organisationId, _.keys(this.localStorageSchema.authUserOrganisation.properties));
    window.localStorage.setItem('authUserOrganisation', JSON.stringify(auth.userObj._organisationId));

    // pick only schema userObj
    this.storage.role = _.pick(auth.userObj._roleId, _.keys(this.localStorageSchema.authUserRole.properties));
    window.localStorage.setItem('authUserRole', JSON.stringify(auth.userObj._roleId));

    // pick only schema userObj
    this.storage._departmentId = _.pick(auth.userObj._roleId._departmentId, _.keys(this.localStorageSchema.authUserDepartment.properties));
    window.localStorage.setItem('authUserDepartment', JSON.stringify(auth.userObj._departmentId));
    
    this.storage.access = auth.userObj._roleId.access 
    window.localStorage.setItem('access', JSON.stringify(auth.userObj._roleId.access));
    
    return true;
  }

  /*get(key ? : string): boolean {

    // check & get auth token from storage
    if (!this.storage.token) {
      this.storage.token = JSON.Parse(window.localStorage.getItem('authToken'));
    }

    // check & get auth user from storage
    if (!this.storage.user) {
      let user = JSON.Parse(window.localStorage.getItem('authUser'));
      this.storage.user = user;
    }

    // check & get auth user organisation from storage
    if (!this.storage.organisation) {
      let organisations = JSON.Parse(window.localStorage.getItem('authUserOrganisation'));
      this.storage.organisation = organisations;
    }

    // check & get auth user role from storage
    if (!this.storage.role) {
      this.storage.role = JSON.Parse(window.localStorage.getItem('authUserRole'));
    }

    // check & get auth user department from storage
    if (!this.storage._departmentId) {
      this.storage._departmentId = JSON.Parse(window.localStorage.getItem('authUserDepartment'));
    }

    // check & get auth user department from storage
    if (!this.storage.access) {
      this.storage.access = JSON.Parse(window.localStorage.getItem('access'));
    }

    return this.storage;
  }*/

  /*delete(auth: any): boolean {
    if (auth) {
      window.localStorage.removeItem(auth);
    } else {
      window.localStorage.clear();
    }
    return true;
  }*/
}
