import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

describe('react-ui-kit', async () => {
  const mod = await import('../../dist/index.mjs');

  it('exports Button', () => {
    assert.ok(mod.Button !== undefined, 'Button should be exported');
  });

  it('exports Card', () => {
    assert.ok(mod.Card !== undefined, 'Card should be exported');
  });

  it('exports Modal as a function', () => {
    assert.ok(typeof mod.Modal === 'function');
  });

  it('exports Tabs as an object', () => {
    assert.ok(mod.Tabs !== undefined, 'Tabs should be exported');
  });

  it('exports cn as a function', () => {
    assert.ok(typeof mod.cn === 'function');
  });
});
