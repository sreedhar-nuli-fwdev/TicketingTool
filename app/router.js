import EmberRouter from '@ember/routing/router';
import config from 'ticketing-tool/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('login');
  this.route('create');
  this.route('tickets');
  this.route('ticket-details', { path: '/ticket-details/:ticket_id' });
  this.route('signup');
  this.route('about');
  this.route('contact-us');
  this.route('my-tickets');
  this.route('add-agent');
  this.route('agent-details', { path: '/agent-details/:agent_id' });
  this.route('agents');
  this.route('user-details');
  this.route('success-screen');
  this.route('search', { path: '/search/:search_id' });
});
