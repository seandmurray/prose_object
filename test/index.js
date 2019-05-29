const assert = require('assert');
const TestObj = require('../index');

const testArray = [1, 2, 3, 4];
const testFunction = () => {};
const testNum = 123;
const testString = 'avalue';

let tmp1;
let orderedObj = { a: [
    [8, 9], { c: 'd', q: [2, 5, 6], z: 'w' }, 'b', 'e'
  ], c: 1, d: undefined, e: null, f: true, g: { one: 'two', z: [2, 5, 'w', 'y'] } };
let unorderedObj = { c: 1, d: undefined, e: null, g: { z: ['y', 5, 'w', 2], 'one': 'two' }, f: true, a: ['b', { z: 'w', c: 'd', q: [5, 6, 2] },
    [9, 8], 'e'
  ] };
let orderedObjHash = 'ae0e3ec0bdd24c02862d3fee2a7dd1094a98f592e950b759d3f1007936b7c503db0934ac2951b145a1b5a065d9a45b2d0ae42d934a7a4af4788193bff7e47444';

// Copy
tmp1 = TestObj.copy(orderedObj);
assert.equal(TestObj.equal(tmp1, orderedObj), true, 'Copy worked and make an equal copy');
tmp1.c = 2;
assert.equal(tmp1.c, 2, 'Checking that copies are not still connected');
assert.equal(orderedObj.c, 1, 'Checking that copies are not still connected');
tmp1 = TestObj.copy(unorderedObj);
assert.equal(TestObj.equal(tmp1, orderedObj, false), false, 'A copy of the unordered does not equal the ordered version');
tmp1 = TestObj.copy(unorderedObj, true);
assert.equal(TestObj.equal(tmp1, orderedObj), true, 'An ordered copy of the unordered does does equal the ordered version');
console.log('Copy testing success');

// isEmpty 
assert.equal(TestObj.isEmpty(), true, 'Undefined is same as empty');
assert.equal(TestObj.isEmpty(undefined), true, 'Undefined is same as empty');
assert.equal(TestObj.isEmpty(null), true, 'Null is same as empty');
assert.equal(TestObj.isEmpty({}), true, 'Empty object is... well... empty');
assert.throws(function () { TestObj.isEmpty(testArray); }, Error, 'Expected an exception!');
assert.throws(function () { TestObj.isEmpty(testFunction); }, Error, 'Expected an exception!');
assert.throws(function () { TestObj.isEmpty(testNum); }, Error, 'Expected an exception!');
assert.throws(function () { TestObj.isEmpty(testString); }, Error, 'Expected an exception!');
assert.throws(function () { TestObj.isEmpty(false); }, Error, 'Expected an exception!');
assert.throws(function () { TestObj.isEmpty(true); }, Error, 'Expected an exception!');
assert.equal(TestObj.isEmpty({ not: 'empty' }), false, 'Not empty object is... well... not empty');
console.log('isEmpty testing success');

// isEmpty 
assert.equal(TestObj.notEmpty(), false, 'Undefined is same as empty');
assert.equal(TestObj.notEmpty(undefined), false, 'Undefined is same as empty');
assert.equal(TestObj.notEmpty(null), false, 'Null is same as empty');
assert.equal(TestObj.notEmpty({}), false, 'Empty object is... well... empty');
assert.throws(function () { TestObj.notEmpty(testArray); }, Error, 'Expected an exception!');
assert.throws(function () { TestObj.notEmpty(testFunction); }, Error, 'Expected an exception!');
assert.throws(function () { TestObj.notEmpty(testNum); }, Error, 'Expected an exception!');
assert.throws(function () { TestObj.notEmpty(testString); }, Error, 'Expected an exception!');
assert.throws(function () { TestObj.notEmpty(false); }, Error, 'Expected an exception!');
assert.throws(function () { TestObj.notEmpty(false); }, Error, 'Expected an exception!');
assert.equal(TestObj.notEmpty({ not: 'empty' }), true, 'Not empty object is... well... not empty');
console.log('notEmpty testing success');

// Equal
assert.equal(TestObj.equal(orderedObj, TestObj.copy(orderedObj)), true, 'Two identical object should be the same');
assert.equal(TestObj.equal(orderedObj, TestObj.copy(orderedObj), false), true, 'Two identical object should be the same, without ordering');
assert.equal(TestObj.equal(orderedObj, TestObj.copy(unorderedObj)), true, 'Different only in the order of items, objects should be the same');
assert.equal(TestObj.equal(orderedObj, TestObj.copy(unorderedObj), false), false, 'Different only in the order of items, objects should be different without ordering');
tmp1 = { c: 1, d: undefined, e: null, g: { z: ['y', 5, ], 'one': 'two' }, f: true, a: ['b', { z: 'w', c: 'd', q: [5, 6, 2] },
    [9, 8], 'e'
  ] };
assert.equal(TestObj.equal(orderedObj, tmp1), false, 'Even a deep differnce should fail the comparison');
console.log('Equal testing success');

// has
assert.equal(TestObj.has(undefined, 1), false, 'False, not an object');
assert.equal(TestObj.has(null, 1), false, 'False, not an object');
assert.equal(TestObj.has('test', 1), false, 'False, not an object');
assert.equal(TestObj.has(1, 1), false, 'False, not an object');
assert.equal(TestObj.has(true, 1), false, 'False, not an object');
assert.equal(TestObj.has(false, 1), false, 'False, not an object');
assert.equal(TestObj.has({ b: 'c' }, 'a'), false, 'Key is not in the object');
assert.equal(TestObj.has({ a: 'c' }, 'a'), true, 'Kis is in the object');
console.log('Has testing success');

// notHave
assert.equal(TestObj.notHave(undefined, 1), true, 'False, not an object');
assert.equal(TestObj.notHave(null, 1), true, 'False, not an object');
assert.equal(TestObj.notHave('test', 1), true, 'False, not an object');
assert.equal(TestObj.notHave(1, 1), true, 'False, not an object');
assert.equal(TestObj.notHave(true, 1), true, 'False, not an object');
assert.equal(TestObj.notHave(false, 1), true, 'False, not an object');
assert.equal(TestObj.notHave({ b: 'c' }, 'a'), true, 'Key is not in the object');
assert.equal(TestObj.notHave({ a: 'c' }, 'a'), false, 'Kis is in the object');
console.log('notHave testing success');

// toHash
tmp1 = TestObj.toHash(orderedObj);
assert.equal(tmp1, orderedObjHash, 'Check the orderedObj to hash value');
tmp1 = TestObj.toHash(unorderedObj);
assert.equal(tmp1, orderedObjHash, 'Check the unorderedObj to hash value of orderedObj should be same');
tmp1 = TestObj.toHash(unorderedObj, false);
assert.notEqual(tmp1, orderedObjHash, 'Check the unorderedObj to hash value of orderedObj be different without ordering');
console.log('toHash testing success');
