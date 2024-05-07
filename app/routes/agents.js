import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class AgentsRoute extends Route {
  @service store;

  async model() {
    try {
      let response = await fetch(`http://localhost:3000/agents`);
      if (!response.ok) {
        throw new Error('Failed to fetch tickets');
      }
      let data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
}
