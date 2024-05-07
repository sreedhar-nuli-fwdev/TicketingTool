import { module, test } from 'qunit';
import { setupTest } from 'ticketing-tool/tests/helpers';

module('Unit | Route | add-agent', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:add-agent');
    assert.ok(route);
  });
});
