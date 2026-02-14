import {readFileSync} from 'node:fs';
import uniqueRandomArray from 'unique-random-array';

const collection = JSON.parse(readFileSync(new URL('gtlds.json', import.meta.url), 'utf8'));
const activeCollection = collection.filter(({contractTerminated}) => !contractTerminated);

const namesSet = new Set(collection.map(({gTLD}) => gTLD));
const activeNamesSet = new Set(activeCollection.map(({gTLD}) => gTLD));
const gtldMap = new Map(collection.map(item => [item.gTLD, item]));

export const all = collection;
export const names = collection.map(({gTLD}) => gTLD);
export const active = activeCollection;
export const activeNames = activeCollection.map(({gTLD}) => gTLD);
export const random = uniqueRandomArray(activeCollection);

/**
 * Check if a given string is a gTLD in the ICANN registry (includes terminated contracts)
 * @param {string} tld - The TLD to check (with or without leading dot)
 * @returns {boolean} True if the TLD exists in the registry, false otherwise
 */
export function isGtld(tld) {
  if (typeof tld !== 'string') {
    return false;
  }

  // Normalize: remove leading dot and convert to lowercase
  const normalized = tld.replace(/^\./, '').toLowerCase();
  return namesSet.has(normalized);
}

/**
 * Check if a given string is an active gTLD (contract not terminated)
 * @param {string} tld - The TLD to check (with or without leading dot)
 * @returns {boolean} True if the TLD is active, false otherwise
 */
export function isActiveGtld(tld) {
  if (typeof tld !== 'string') {
    return false;
  }

  // Normalize: remove leading dot and convert to lowercase
  const normalized = tld.replace(/^\./, '').toLowerCase();
  return activeNamesSet.has(normalized);
}

/**
 * Get detailed information about a gTLD
 * @param {string} tld - The TLD to look up (with or without leading dot)
 * @returns {object|null} gTLD object with contractTerminated, gTLD, and registryOperator, or null if not found
 */
export function getInfo(tld) {
  if (typeof tld !== 'string') {
    return null;
  }

  // Normalize: remove leading dot and convert to lowercase
  const normalized = tld.replace(/^\./, '').toLowerCase();
  return gtldMap.get(normalized) || null;
}
