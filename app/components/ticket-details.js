import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class TicketDetailsComponent extends Component {
  @service router;
  @service store;

  @tracked commentText = '';
  @tracked status = '';

  @action
  handleCommentInput(event) {
    this.commentText = event.target.value;
  }

  @action
  handleStatusChange(event) {
    this.status = event.target.value;
  }

  @action
  async onSubmit() {
    const ticket = this.args.ticket;
    if (!ticket) {
      console.error('Ticket not found.');
      return;
    }

    const userName = localStorage.getItem('username');
    const commentText = this.commentText.trim();
    const status = this.status.trim();

    try {
      // Update comments and ticket
      if (commentText || status) {
        await this.updateComments(commentText, ticket, userName);
        await this.updateTicket(ticket, status);
        window.location.reload();
      } else {
        console.warn('No changes to submit.');
      }
    } catch (error) {
      console.error('Failed to find ticket:', error);
    }
  }

  async updateComments(commentText, ticket, userName) {
    if (commentText) {
      try {
        const response = await fetch('http://localhost:3000/comments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            content: commentText,
            ticket_id: ticket.id,
            user: userName,
          }),
        });

        if (response.ok) {
          console.log('Comment saved successfully.');
        } else {
          throw new Error('Failed to save comment.');
        }
      } catch (error) {
        console.error('Failed to save comment:', error);
      }
    }
  }

  async updateTicket(ticket, status) {
    if (status && ticket) {
      try {
        const response = await fetch(
          `http://localhost:3000/tickets/${ticket.id}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ticket_id: ticket.id,
              status: status,
            }),
          },
        );

        if (response.ok) {
          console.log('Ticket updated successfully.');
        } else {
          throw new Error('Failed to update ticket.');
        }
      } catch (error) {
        console.error('Failed to update ticket:', error);
      }
    } else {
      console.log('Either status is unchanged or ticket obj is null');
    }
  }
}
