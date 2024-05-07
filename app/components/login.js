import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';


export default class LoginFormComponent extends Component {
  @tracked errorMessage;
  @service router;
  @tracked isAuthenticated = false;
  @service translation;
  @service auth;

  constructor() {
    super(...arguments);
    this.auth.clearToken();
  }
  @action
  async onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.get('email'),
          password: formData.get('password'),
        }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      // Assuming your Rails API returns a token upon successful login
      localStorage.setItem('username', data.user.name);
      localStorage.setItem('userid', data.user.id);
      localStorage.setItem('account_type', data.user.account_type);
      this.auth.setToken(data.token);

      //this need to be updated with user name after a fetch request based on email
      localStorage.setItem('email', formData.get('email'));

      this.isAuthenticated = true;
      // Redirect to a protected route upon successful login
      this.router.transitionTo('tickets');
    } catch (error) {
      this.errorMessage = 'Invalid username or password';
    }
  }
}
