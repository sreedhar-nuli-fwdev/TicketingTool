// routes/ticket-details.js
import Route from '@ember/routing/route';
import ApplicationRoute from './application';
import { service } from '@ember/service';

export default class UserDetailsRoute extends ApplicationRoute {
  @service fileStorage;

  async model() {
    try {
      let id = localStorage.getItem('userid');
      let response = await fetch(`http://localhost:3000/users/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch tickets');
      }
      let data = await response.json();
      data.profile_pic = this.profilePicUrl(data.user_name);
      return data;
    } catch (error) {
      console.error(error);
      // Handle error appropriately
    }
    // Fetch the ticket details based on the ID from the route params
    //return this.store.findRecord('ticket', params.ticket_id);
  }

  profilePicUrl(user_name) {
    const profilePic = this.fileStorage.retrieveFile(user_name);
    if (profilePic instanceof Blob) {
      return URL.createObjectURL(profilePic);
    } else {
      return null;
    }
  }
}
