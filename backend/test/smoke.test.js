const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');

test('backend package manifest is present and named correctly', () => {
  const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
  assert.equal(pkg.name, 'hms-backend');
  assert.ok(pkg.scripts.start.includes('node'));
});
