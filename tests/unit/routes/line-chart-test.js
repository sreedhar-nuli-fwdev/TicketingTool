import { module, test } from 'qunit';
import { setupTest } from 'ticketing-tool/tests/helpers';

module('Unit | Route | line-chart', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:line-chart');
    assert.ok(route);
  });
});
