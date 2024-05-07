import Model, { attr } from '@ember-data/model';

export default class AgentModel extends Model {
  @attr('string') email;
  @attr('string') name;
  @attr('string') user_name;
  @attr('string') team;
  @attr('string') profile_pic;
  @attr('number') phone_number;
}
