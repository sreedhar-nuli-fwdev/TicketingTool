import Service from '@ember/service';

export default class TranslationService extends Service {
  locale = 'en'; // Default locale
  t = {};

  constructor() {
    super(...arguments);
    console.log('translation service');
  }

  async updateLocale(locale) {
    console.log('inside updatelOCALE METHOD ');
    this.locale = locale;
    try {
      const response = await fetch(
        `http://localhost:3000/translations?locale=${this.locale}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (!response.ok) {
        throw new Error('Failed to fetch translations');
      }
      console.log('inside translation after request fire');
      let data = await response.json();

      // Update locale and store it in localStorage

      console.log('data is :' + data.toString());
      this.t = data.t;
      localStorage.setItem('translation', JSON.stringify(this.t));
      console.log('printing data ', this.t.contact_us);
    } catch (error) {
      console.error('Error updating locale:', error);
    }
  }
}
