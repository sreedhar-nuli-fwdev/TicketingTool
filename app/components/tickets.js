// components/tickets.js
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class TicketTableComponent extends Component {
  @service router;
  searchText = '';

  @action
  openTicket(ticket) {
    // Navigate to a different route to display ticket details
    console.log('here' + ticket);
    this.router.transitionTo('ticket-details', ticket.id);
  }

  @action
  performSearch() {
    this.router.transitionTo('search', this.searchText);
  }

  @action
  handleInputChange(event) {
    // Update searchText property with the value from the input field
    this.searchText = event.target.value;
  }
}
