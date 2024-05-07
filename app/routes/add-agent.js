import ApplicationRoute from './application';

export default class AddAgentRoute extends ApplicationRoute {
  async model() {
    return {};
  }

  async saveAgentAction(agentData) {
    try {
      const response = await fetch('http://localhost:3000/agents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(agentData),
      });
      if (!response.ok) {
        throw new Error('Failed to save agent');
      }
      this.transitionTo('agents'); // Redirect to agents route after successfully saving the agent
    } catch (error) {
      console.error(error);
      // Handle error, maybe show a notification to the user
    }
  }
}
