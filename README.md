# gtlds [![CI](https://github.com/chrisvogt/gtlds/actions/workflows/ci.yml/badge.svg)](https://github.com/chrisvogt/gtlds/actions/workflows/ci.yml) [![codecov](https://codecov.io/gh/chrisvogt/gtlds/branch/master/graph/badge.svg)](https://codecov.io/gh/chrisvogt/gtlds)

> gTLD utilities

A list of all gTLDs from the ICANN registry, including the registry operator and whether the gTLD has been terminated.

The list is a [JSON file](gtlds.json) and can be used anywhere.


## Install

```
$ npm install gtlds
```


## Usage

```js
import gtlds from 'gtlds';

// Check if a TLD exists in the ICANN registry (including terminated)
gtlds.isGtld('com');
//=> true

gtlds.isGtld('abarth'); // Terminated contract
//=> true

// Check if a TLD is currently active (not terminated)
gtlds.isActiveGtld('com');
//=> true

gtlds.isActiveGtld('abarth'); // Terminated contract
//=> false

gtlds.isActiveGtld('.org');
//=> true

gtlds.isActiveGtld('invalid');
//=> false

// Get detailed information about a gTLD
gtlds.getInfo('google');
/*
{
  contractTerminated: false,
  gTLD: 'google',
  registryOperator: 'Charleston Road Registry Inc.'
}
*/

gtlds.getInfo('abarth'); // Terminated
/*
{
  contractTerminated: true,
  gTLD: 'abarth',
  registryOperator: null
}
*/

gtlds.getInfo('invalid');
//=> null

// Get a random active gTLD
gtlds.random();
/*
{
  "contractTerminated": false,
  "gTLD": "google",
  "registryOperator": "Charleston Road Registry Inc."
}
*/

// Access the data
gtlds.all.length;        // 1,275 (all gTLDs including terminated)
gtlds.active.length;     // 1,120 (active gTLDs only)
gtlds.names.length;      // 1,275 (all gTLD names)
gtlds.activeNames.length; // 1,120 (active gTLD names only)
```

**Note:** This package is ESM-only and requires Node.js 18 or higher.

### Active vs All gTLDs

This package distinguishes between **all gTLDs** (historical registry) and **active gTLDs** (currently operational):

- **All gTLDs** (1,275): Includes all gTLDs ever registered with ICANN, even those with terminated contracts
- **Active gTLDs** (1,120): Only gTLDs with active contracts that are currently operational

**155 gTLDs have terminated contracts** and are no longer operational (e.g., `.abarth`, `.bentley`, `.adac`). Use `isActiveGtld()` for validation in production applications.


## API

### .all

Type: `Array`

All gTLDs in the ICANN registry, including those with terminated contracts.

### .active

Type: `Array`

Active gTLDs only (excludes terminated contracts).

### .names

Type: `Array`

All gTLD names, including terminated contracts.

### .activeNames

Type: `Array`

Active gTLD names only (excludes terminated contracts).

### .random()

Type: `Function`

Returns a random **active** gTLD (excludes terminated contracts).

### .isGtld(tld)

Type: `Function`

Check if a given string exists in the ICANN gTLD registry (includes terminated contracts).

#### Parameters

- `tld` (string): The TLD to check (with or without leading dot, case-insensitive)

#### Returns

`boolean` - `true` if the TLD exists in the registry, `false` otherwise

#### Example

```js
import gtlds from 'gtlds';

gtlds.isGtld('com');      // true
gtlds.isGtld('.org');     // true
gtlds.isGtld('GOOGLE');   // true
gtlds.isGtld('abarth');   // true (terminated, but in registry)
gtlds.isGtld('invalid');  // false
```

### .isActiveGtld(tld)

Type: `Function`

Check if a given string is an **active** gTLD (excludes terminated contracts). **Recommended for production validation.**

#### Parameters

- `tld` (string): The TLD to check (with or without leading dot, case-insensitive)

#### Returns

`boolean` - `true` if the TLD is active, `false` otherwise

#### Example

```js
import gtlds from 'gtlds';

gtlds.isActiveGtld('com');      // true
gtlds.isActiveGtld('.org');     // true
gtlds.isActiveGtld('GOOGLE');   // true
gtlds.isActiveGtld('abarth');   // false (terminated)
gtlds.isActiveGtld('invalid');  // false
```

### .getInfo(tld)

Type: `Function`

Get detailed information about a gTLD, including registry operator and contract status.

#### Parameters

- `tld` (string): The TLD to look up (with or without leading dot, case-insensitive)

#### Returns

`object|null` - gTLD object with the following properties, or `null` if not found:
- `gTLD` (string): The gTLD name
- `contractTerminated` (boolean): Whether the contract is terminated
- `registryOperator` (string|null): The registry operator name, or `null` if terminated

#### Example

```js
import gtlds from 'gtlds';

gtlds.getInfo('google');
// {
//   contractTerminated: false,
//   gTLD: 'google',
//   registryOperator: 'Charleston Road Registry Inc.'
// }

gtlds.getInfo('.COM');  // Case-insensitive
// {
//   contractTerminated: false,
//   gTLD: 'com',
//   registryOperator: 'VeriSign, Inc.'
// }

gtlds.getInfo('abarth');  // Terminated
// {
//   contractTerminated: true,
//   gTLD: 'abarth',
//   registryOperator: null
// }

gtlds.getInfo('invalid');  // null
```


## Updating

A node script is available to sync gTLD data via `npm run sync`. It will fetch, parse, and overwrite the _gtlds.json_ file.

**Last updated:** February 12, 2026  
**Total gTLDs:** 1,275 (1,120 active, 155 terminated)

The list includes 4 new gTLDs since the previous version: `.hotel`, `.kids`, `.merck`, and `.music`.


## License

MIT © [Chris Vogt](https://www.chrisvogt.me)
