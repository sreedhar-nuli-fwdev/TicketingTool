import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class AddAgentFormComponent extends Component {
  @service router;

  @action
  async deleteAgent(agent) {
    const agentId = agent.id;
    try {
      const response = await fetch(`http://localhost:3000/agents/${agentId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete agent');
      }

      // Redirect to a agents route after successful deletion
      this.router.transitionTo('agents'); // Redirect to agents list page
    } catch (error) {
      console.error('Error deleting agent:', error);
      // Handle error
    }
  }
}
