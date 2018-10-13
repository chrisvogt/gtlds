import test from 'ava';
import gtlds from '.';

const expectedKeys = [
  'contractTerminated',
  'gTLD',
  'registryOperator'
];

test('it returns the full collection', t => {
  t.is(Array.isArray(gtlds.all), true);
});

test('it returns an array of names from the collection', t => {
  const allNames = gtlds.all.map(({gTLD}) => gTLD);
  t.is(Array.isArray(gtlds.names), true);
  t.deepEqual(gtlds.names, allNames);
});

test('it gets the expected gTLD object from the collection', t => {
  const needle = 'google';
  const result = gtlds.get(needle);
  const target = gtlds.all.find(({gTLD}) => gTLD === needle);
  t.deepEqual(result, target);
  t.deepEqual(Object.keys(result), expectedKeys);
});

test('it returns false for invalid gTLDs', t => {
  const invalidName = '#@*$invalidNam3';
  t.is(gtlds.isValid(invalidName), false);
});

test('it gets a random object from the collection', t => {
  const gTLD = gtlds.random();
  t.truthy(gTLD);
  t.deepEqual(Object.keys(gTLD), expectedKeys);
});
