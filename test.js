import test from 'ava';
import * as gtlds from './index.js';

const expectedKeys = [
  'contractTerminated',
  'gTLD',
  'registryOperator',
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

test('it returns the active collection', t => {
  t.is(Array.isArray(gtlds.active), true);
  t.true(gtlds.active.length < gtlds.all.length);
  t.true(gtlds.active.every(({contractTerminated}) => !contractTerminated));
});

test('it returns an array of active names', t => {
  t.is(Array.isArray(gtlds.activeNames), true);
  t.is(gtlds.activeNames.length, gtlds.active.length);
  t.true(gtlds.activeNames.length < gtlds.names.length);
});

test('isGtld returns true for valid gTLDs', t => {
  t.is(gtlds.isGtld('com'), true);
  t.is(gtlds.isGtld('org'), true);
  t.is(gtlds.isGtld('google'), true);
  t.is(gtlds.isGtld('hotel'), true);
});

test('isGtld returns true for terminated gTLDs', t => {
  t.is(gtlds.isGtld('abarth'), true);
  t.is(gtlds.isGtld('bentley'), true);
});

test('isGtld returns true for valid gTLDs with leading dot', t => {
  t.is(gtlds.isGtld('.com'), true);
  t.is(gtlds.isGtld('.org'), true);
  t.is(gtlds.isGtld('.google'), true);
});

test('isGtld returns true for case-insensitive gTLDs', t => {
  t.is(gtlds.isGtld('COM'), true);
  t.is(gtlds.isGtld('OrG'), true);
  t.is(gtlds.isGtld('.GOOGLE'), true);
});

test('isGtld returns false for invalid gTLDs', t => {
  t.is(gtlds.isGtld('notarealgtld'), false);
  t.is(gtlds.isGtld('xyz123'), false);
  t.is(gtlds.isGtld(''), false);
});

test('isGtld returns false for non-string inputs', t => {
  t.is(gtlds.isGtld(null), false);
  t.is(gtlds.isGtld(undefined), false);
  t.is(gtlds.isGtld(123), false);
  t.is(gtlds.isGtld({}), false);
});

test('isActiveGtld returns true for active gTLDs', t => {
  t.is(gtlds.isActiveGtld('com'), true);
  t.is(gtlds.isActiveGtld('org'), true);
  t.is(gtlds.isActiveGtld('google'), true);
  t.is(gtlds.isActiveGtld('hotel'), true);
});

test('isActiveGtld returns false for terminated gTLDs', t => {
  t.is(gtlds.isActiveGtld('abarth'), false);
  t.is(gtlds.isActiveGtld('bentley'), false);
  t.is(gtlds.isActiveGtld('adac'), false);
});

test('isActiveGtld supports leading dot and case insensitivity', t => {
  t.is(gtlds.isActiveGtld('.com'), true);
  t.is(gtlds.isActiveGtld('COM'), true);
  t.is(gtlds.isActiveGtld('.GOOGLE'), true);
});

test('isActiveGtld returns false for invalid gTLDs', t => {
  t.is(gtlds.isActiveGtld('notarealgtld'), false);
  t.is(gtlds.isActiveGtld('xyz123'), false);
  t.is(gtlds.isActiveGtld(''), false);
});

test('random returns only active gTLDs', t => {
  for (let i = 0; i < 10; i++) {
    const gTLD = gtlds.random();
    t.is(gTLD.contractTerminated, false);
  }
});

test('getInfo returns full gTLD object for valid gTLDs', t => {
  const google = gtlds.getInfo('google');
  t.truthy(google);
  t.is(google.gTLD, 'google');
  t.is(google.contractTerminated, false);
  t.truthy(google.registryOperator);
});

test('getInfo works with leading dot and case insensitivity', t => {
  const com1 = gtlds.getInfo('com');
  const com2 = gtlds.getInfo('.com');
  const com3 = gtlds.getInfo('COM');
  t.deepEqual(com1, com2);
  t.deepEqual(com1, com3);
});

test('getInfo returns info for terminated gTLDs', t => {
  const abarth = gtlds.getInfo('abarth');
  t.truthy(abarth);
  t.is(abarth.gTLD, 'abarth');
  t.is(abarth.contractTerminated, true);
  t.is(abarth.registryOperator, null);
});

test('getInfo returns null for invalid gTLDs', t => {
  t.is(gtlds.getInfo('notarealgtld'), null);
  t.is(gtlds.getInfo('xyz123'), null);
  t.is(gtlds.getInfo(''), null);
});

test('getInfo returns null for non-string inputs', t => {
  t.is(gtlds.getInfo(null), null);
  t.is(gtlds.getInfo(undefined), null);
  t.is(gtlds.getInfo(123), null);
  t.is(gtlds.getInfo({}), null);
});
