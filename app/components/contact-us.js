import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class ContactUsFormComponent extends Component {
  @tracked errorMessage;
  @service router;

  @action
  async submitContactForm(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const username = localStorage.getItem('username');

    try {
      const response = await fetch('http://localhost:3000/users/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.get('email'),
          name: formData.get('name'),
          message: formData.get('message'),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create ticket');
      }

      const data = await response.json();

      // Redirect to the newly created ticket
      this.router.transitionTo('success-screen');
    } catch (error) {
      this.errorMessage = 'Failed to create ticket';
    }
  }
}
