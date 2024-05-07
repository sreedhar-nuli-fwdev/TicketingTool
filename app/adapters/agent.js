import RESTAdapter from '@ember-data/adapter/rest';

export default class AgentAdapter extends RESTAdapter {
  host = 'http://localhost:3000';

}
