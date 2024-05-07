import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class AuthService extends Service {
  @tracked isLoggedInUser = false;
  @tracked isAdminUser = false;
  @tracked isAgentUser = false;
  @tracked isTicketsPage = false;

  constructor() {
    super();
    this.setAttributes();
  }

  validateToken() {
    const token = localStorage.getItem('token');
    // Your validation logic here
    if (token !== null) {
      this.isLoggedInUser = true;
      return true;
    } else {
      this.isLoggedInUser = false;
      return false;
    }
  }

  getToken() {
    return localStorage.getItem('token');
  }

  setToken(token) {
    localStorage.setItem('token', token);
    this.setAttributes();
    this.isLoggedInUser = true;
  }

  clearToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    this.isLoggedInUser = false;
  }

  setAttributes() {
    const account_type = localStorage.getItem('account_type');
    if (account_type === 'Agent Account') {
      this.isagentUser = true;
    } else if (account_type === 'Admin Account') {
      this.isAdminUser = true;
    }
  }
}
