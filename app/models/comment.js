import Model, { attr, belongsTo } from '@ember-data/model';

export default class CommentModel extends Model {
  @attr('string') content;
  @attr('ticket_id') ticket_id;
  //@belongsTo('ticket', { async: true , inverse: false}) ticket;
}
