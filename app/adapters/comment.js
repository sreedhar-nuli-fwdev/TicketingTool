// app/adapters/comment.js

import JSONAPIAdapter from '@ember-data/adapter/json-api';

export default class CommentAdapter extends JSONAPIAdapter {
  host = 'http://localhost:3000/comments';
}
