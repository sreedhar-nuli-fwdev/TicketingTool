import { module, test } from 'qunit';

import { setupTest } from 'ticketing-tool/tests/helpers';

module('Unit | Adapter | ticket', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let adapter = this.owner.lookup('adapter:ticket');
    assert.ok(adapter);
  });
});
