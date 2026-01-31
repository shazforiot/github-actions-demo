const { test, describe } = require('node:test');
const assert = require('node:assert');
const { add, subtract, multiply, divide } = require('./index.js');

describe('Calculator Functions', () => {

  describe('add()', () => {
    test('adds two positive numbers', () => {
      assert.strictEqual(add(2, 3), 5);
    });

    test('adds negative numbers', () => {
      assert.strictEqual(add(-1, -1), -2);
    });

    test('adds zero', () => {
      assert.strictEqual(add(5, 0), 5);
    });
  });

  describe('subtract()', () => {
    test('subtracts two numbers', () => {
      assert.strictEqual(subtract(5, 3), 2);
    });

    test('returns negative when result is negative', () => {
      assert.strictEqual(subtract(3, 5), -2);
    });
  });

  describe('multiply()', () => {
    test('multiplies two numbers', () => {
      assert.strictEqual(multiply(4, 3), 12);
    });

    test('multiplies by zero', () => {
      assert.strictEqual(multiply(5, 0), 0);
    });

    test('multiplies negative numbers', () => {
      assert.strictEqual(multiply(-2, 3), -6);
    });
  });

  describe('divide()', () => {
    test('divides two numbers', () => {
      assert.strictEqual(divide(10, 2), 5);
    });

    test('returns decimal result', () => {
      assert.strictEqual(divide(7, 2), 3.5);
    });

    test('throws error when dividing by zero', () => {
      assert.throws(
        () => divide(10, 0),
        { message: 'Cannot divide by zero' }
      );
    });
  });

});

describe('Edge Cases', () => {
  test('handles large numbers', () => {
    assert.strictEqual(add(1000000, 2000000), 3000000);
  });

  test('handles decimal numbers', () => {
    assert.strictEqual(add(0.1, 0.2).toFixed(1), '0.3');
  });
});
