import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class NavBarComponent extends Component {
  @tracked errorMessage;
  @service router;
  @service translation;
  @service auth;
  @tracked searchKey = '';
  @action
  changeLanguage(event) {
    console.log('event got changed');
    localStorage.setItem('lang', event);
    window.location.reload();
  }

  @action
  performSearch() {
    this.router.transitionTo('search', this.searchKey);
  }

  @action
  handleKeyDown(event) {
    if (event.key === 'Enter') {
      // If the Enter key is pressed, trigger the performSearch action
      this.searchKey = event.target.value;
      this.performSearch();
    }
  }
}
