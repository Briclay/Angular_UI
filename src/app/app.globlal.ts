import { Injectable } from '@angular/core';

@Injectable()
export class jspAppGlobal {
  /**
   * APP BASE URL */
 
  APP_BASE_URL = 'http://localhost:5000';

  /**
   * APP API URL
   */
  APP_API_URL = 'http://localhost:3000/api/v1';

  /**
   * APP API BASE URL
   */
  APP_API_BASE_URL = 'http://localhost:4200';

  APP_LOCAL = 'http://localhost:4300/assets/data'
}

/**
 * Note: url with no trailing slash
 */