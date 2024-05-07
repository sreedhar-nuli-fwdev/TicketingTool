import JSONAPIAdapter from '@ember-data/adapter/json-api';

export default class TicketAdapter extends JSONAPIAdapter {
  host = 'http://localhost:3000/';
}
