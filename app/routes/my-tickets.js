import ApplicationRoute from './application';
import { inject as service } from '@ember/service';

export default class MyTicketsRoute extends ApplicationRoute {
  @service auth;
  @service router;

  async model() {
    try {
      if (!this.auth.validateToken()) {
        this.router.transitionTo('login');
      }

      let ticketsString = localStorage.getItem('allTickets');

      // Parse the string into an array of tickets
      let tickets = JSON.parse(ticketsString);

      let currentUser = localStorage.getItem('username');
      let userTickets = tickets.filter(
        (ticket) =>
          ticket.assigned_to_user === currentUser ||
          ticket.createdby === currentUser,
      );

      return userTickets;
    } catch (error) {
      console.error(error);
    }
  }
}
