import {readFileSync} from 'node:fs';
import uniqueRandomArray from 'unique-random-array';

const collection = JSON.parse(readFileSync(new URL('gtlds.json', import.meta.url), 'utf8'));

export const all = collection;
export const names = collection.map(({gTLD}) => gTLD);
export const random = uniqueRandomArray(collection);
