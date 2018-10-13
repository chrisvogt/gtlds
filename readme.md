# gtlds [![Build Status](https://travis-ci.org/chrisvogt/gtlds.svg?branch=master)](https://travis-ci.org/chrisvogt/gtlds)

> gTLD utilities

A list of all gTLDs from the ICANN registry, including the registry operator and whether the gTLD has been terminated.

The list is a [JSON file](gtlds.json) and can be used anywhere.


## Install

```
$ npm install gtlds
```


## Usage

```js
const gtlds = require('gtlds');

gtlds.get('apple');
/*
{
  "contractTerminated":false,
  "gTLD":"apple",
  "registryOperator":"Apple Inc."
}
*/

gtlds.isValid('apple');
/* TRUE */

gtlds.random();
/*
{
  "contractTerminated":false,
  "gTLD":"google",
  "registryOperator":"Charleston Road Registry Inc."
}
*/
```


## API

### .all

Type: `Array`

gTLDs in alphabetical order.

### .names

Type: `Array`

gTLD names in alphabetical order.

### .get(`gTLD` _string_)

Type: `Function`

Get data for a specific gTLD.

### .isValid(`gTLD` _string_)

Type: `Function`

Validate a gTLD name.

_NOTE: Returns `true` for terminated gTLDs._

### .random()

Type: `Function`

Random gTLD.


## Updating

A node script is available to sync gTLD data via `npm run sync`. It will fetch, parse, and overwrite the _gtlds.json_ file.


## License

MIT © [Chris Vogt](https://www.chrisvogt.me)
