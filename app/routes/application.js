// app/routes/tickets.js

import Route from '@ember/routing/route';
import fetch from 'fetch';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service auth;
  @service translation;
  @service router;

  async beforeModel(_transition) {
    const targetUrl = _transition.intent.url;
    await this.loadLocaleData();
    if (
      targetUrl === undefined ||
      !(
        targetUrl.includes('/about') ||
        targetUrl.includes('/contact-us') ||
        targetUrl.includes('/signup') ||
        targetUrl.includes('/login')
      )
    ) {
      if (!this.auth.validateToken()) {
        this.router.transitionTo('login');
      }

      /*if((targetUrl!==undefined && targetUrl.includes("/tickets")) || (this.router.currentURL !== undefined && this.router.currentURL.includes("/tickets"))) {
        this.auth.isTicketsPage = true;
      }else{
        this.auth.isTicketsPage = false;
      }*/
    }
  }

  async loadLocaleData() {
    //default we are loading with english
    const lang = localStorage.getItem('lang') || 'en';
    await this.translation.updateLocale(lang);
  }
}
