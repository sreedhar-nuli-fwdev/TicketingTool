import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class SignupFormComponent extends Component {
  @tracked errorMessage;
  @service router;
  @service auth;

  @action
  async onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.get('email'),
          password: formData.get('password'),
          name: formData.get('name'),
        }),
      });

      if (!response.ok) {
        throw new Error('SignUp failed');
      }

      const data = await response.json();
      // Assuming your Rails API returns a token upon successful login
      this.auth.setToken(data.token);
      // Redirect to a protected route upon successful login
      this.router.transitionTo('tickets');
    } catch (error) {
      this.errorMessage = 'Signup failed';
    }
  }
}
