'use strict';

const fs = require('fs');
const {promisify} = require('util');
const got = require('got');

const writeFile = promisify(fs.writeFile);
const gtldsURL = 'https://www.icann.org/resources/registries/gtlds/v2/gtlds.json';

const COMPLETED = 'Finished syncing. {count} saved.';
const ERROR_FETCHING = 'Error fetching gTLDs.';
const ERROR_SAVING = 'Error saving file';

(async () => {
  try {
    const gtlds = [];
    const response = await got(gtldsURL, {json: true});

    response.body.gTLDs.map(({
      contractTerminated,
      gTLD,
      registryOperator
    }) => gtlds.push({
      contractTerminated,
      gTLD,
      registryOperator
    }));

    try {
      await writeFile('gtlds.json', JSON.stringify(gtlds));
      console.log(COMPLETED.replace('{count}', gtlds.length));
    } catch (error) {
      console.log(ERROR_SAVING, error);
    }
  } catch (error) {
    console.log(ERROR_FETCHING, error.response.body);
  }
})();
