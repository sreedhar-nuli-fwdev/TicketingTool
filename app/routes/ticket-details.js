import ApplicationRoute from './application';
import { inject as service } from '@ember/service';

export default class TicketDetailsRoute extends ApplicationRoute {
  @service router;

  async model(params) {
    try {
      let id = params.ticket_id;
      let response = await fetch(`http://localhost:3000/tickets/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch tickets');
      }
      let data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
      // Handle error appropriately
    }
    // Fetch the ticket details based on the ID from the route params
    //return this.store.findRecord('ticket', params.ticket_id);
  }
}
