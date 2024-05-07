import { module, test } from 'qunit';
import { setupRenderingTest } from 'ticketing-tool/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | add-agent-form', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<AddAgentForm />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <AddAgentForm>
        template block text
      </AddAgentForm>
    `);

    assert.dom().hasText('template block text');
  });
});
