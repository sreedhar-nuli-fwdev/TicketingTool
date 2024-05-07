// components/tickets.js
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class TicketTableComponent extends Component {
  @service router;
  @service auth;

  @action
  view(agent) {
    if (!this.auth.validateToken()) {
      this.router.transitionTo('login');
    }

    // Navigate to a different route to display ticket details
    this.router.transitionTo('agent-details', agent.id);
  }
}
