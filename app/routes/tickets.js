import fetch from 'fetch';
import ApplicationRoute from './application';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class TicketsRoute extends ApplicationRoute {
  @service auth;
  @service router;

  async model() {
    try {
      let response = await fetch('http://localhost:3000/tickets');
      if (!response.ok) {
        throw new Error('Failed to fetch tickets');
      }
      let data = await response.json();
      console.log(data);
      localStorage.setItem('allTickets', JSON.stringify(data));
      return data;
    } catch (error) {
      console.error(error);
      // Handle error appropriately
    }
  }
}
