import axios from 'axios';

import config from '../config';

export default class ApiController {

  constructor() {
    this.axios = axios;

    this.api = axios.create({
      baseURL: config.api.host,
      timeout: 10000,
      withCredentials: true,
      transformRequest: [(data, headers) => {
        if (this.securityToken) {
          headers['Security-Token'] = this.securityToken;
        }
        console.log(data);
        return JSON.stringify(data);
      }],
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }

  registerToken(token) {
    return this.api.post('/api/register-token', {
      token,
    })
      .then(data => data.data.securityToken);
  }

  setSecurityToken(securityToken) {
    this.securityToken = securityToken;
  }
}
