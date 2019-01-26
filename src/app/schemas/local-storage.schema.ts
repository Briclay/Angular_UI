import { Injectable, Inject } from '@angular/core';

@Injectable()

export class LocalStorageSchema {

  /**
   * User schema
   */
  authUser = {
    properties: {
      _id: { type: 'string' },
      displayName: { type: 'string' },
      username: { type: 'string' },
      userType: { type: 'string' },
      email: { type: 'string' },
      lastLoginAt: { type: 'string' },
      profileImageUrl: { type: 'string' }
    },
    required: ['_id', 'username', 'userType', 'email']
  };

  /**
   * User Organisation schema
   */
  authUserOrganisation = {
    properties: {
      _id: { type: 'string' },
      name: { type: 'string' },
      orgType : { type: 'string' },
      orgCode: { type: 'string' },
      logoImage: { type: 'string' },
      email : { type: 'string' }
    },
    required: ['id', 'name', 'orgCode' ]
  };

  /**
   * User Role schema
   */
  authUserRole = {
    properties: {
      _id: { type: 'string' },
      name: { type: 'string' },
    },
    required: ['id', 'name']
  };

  /**
   * User Department schema
   */
  authUserDepartment = {
    properties: {
      _departmentId : { type: 'string' }
    },
    required: ['id']
  };

}
