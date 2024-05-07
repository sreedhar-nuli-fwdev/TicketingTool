// app/components/add-agent-form.js
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class AddAgentFormComponent extends Component {
  @service fileStorage;
  @tracked name;
  @tracked email;
  @tracked userName;
  @tracked team;
  @tracked profilePic;
  @tracked phoneNumber;
  @service router;

  @action
  async onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    try {
      const response = await fetch('http://localhost:3000/agents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          team: formData.get('team'),
          phone_number: formData.get('phonenumber'),
          user_name: formData.get('username'),
          profile_pic: '',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create ticket');
      } else {
        //on agent data persist upload file to local storage
        await this.fileStorage.storeFile(
          formData.get('username'),
          this.selectedFile,
        );
      }

      const data = await response.json();

      // Redirect to the newly created ticket
      this.router.transitionTo('agent-details', data.id);
    } catch (error) {
      this.errorMessage = 'Failed to create ticket';
    }
  }

  @action
  handleFileSelect(event) {
    this.selectedFile = event.target.files[0];
  }
}
