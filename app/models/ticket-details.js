import Model from '@ember-data/model';

export default class TicketDetailsModel extends Model {
  onsubmit(ticket) {
    if (!this.auth.validateToken()) {
      this.router.transitionTo('login');
    }

    // Navigate to a different route to display ticket details
    console.log('here' + ticket);
    this.router.transitionTo('ticket-details', ticket.id);
  }
}
