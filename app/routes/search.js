import Route from '@ember/routing/route';
import {inject as service} from "@ember/service";
import ApplicationRoute from "./application";

export default class SearchRoute extends ApplicationRoute {

  @service auth;
  @service router;

  async model(param) {

    try {
      let value = param.search_id;
      let response = await fetch(`http://localhost:3000/search?q=${value}`);
      if (!response.ok) {
        throw new Error('Failed to fetch tickets');
      }
      let data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      // Handle error appropriately
    }
  }
}
