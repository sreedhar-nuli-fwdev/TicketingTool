import { module, test } from 'qunit';
import { setupTest } from 'ticketing-tool/tests/helpers';

module('Unit | Controller | line-chart', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:line-chart');
    assert.ok(controller);
  });
});
