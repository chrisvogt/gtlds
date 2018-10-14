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

test('it gets a random object from the collection', t => {
  const gTLD = gtlds.random();
  t.truthy(gTLD);
  t.deepEqual(Object.keys(gTLD), expectedKeys);
});
