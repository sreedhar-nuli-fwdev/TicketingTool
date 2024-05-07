import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class CreateFormComponent extends Component {
  @tracked errorMessage;
  @service router;

  @action
  async onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const username = localStorage.getItem('username');

    try {
      const response = await fetch('http://localhost:3000/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.get('title'),
          description: formData.get('description'),
          //comments: formData.get('comments'),
          createdby: username,
          modifiedby: username,
          status: 'new',
          assigned_to_user: '',
          assigned_to_user_id: '',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create ticket');
      }

      const data = await response.json();

      // Redirect to the newly created ticket
      this.router.transitionTo('ticket-details', data.id);
    } catch (error) {
      this.errorMessage = 'Failed to create ticket';
    }
  }
}
