import Model from '@ember-data/model';

export default class TicketModel extends Model {
  @attr('string') title;
  @attr('string') description;
  @attr('string') assignedToUser;
  @attr('string') status;
  @attr('string') createdby;
  @attr('string') modifiedby;
  @attr('comment') comments;
}
