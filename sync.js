import {writeFile} from 'node:fs/promises';
import got from 'got';

const gtldsURL = 'https://www.icann.org/resources/registries/gtlds/v2/gtlds.json';

const COMPLETED = 'Finished syncing. {count} saved.';
const ERROR_FETCHING = 'Error fetching gTLDs.';
const ERROR_SAVING = 'Error saving file';

try {
  const gtlds = [];
  const response = await got(gtldsURL).json();

  for (const {contractTerminated, gTLD, registryOperator} of response.gTLDs) {
    gtlds.push({
      contractTerminated,
      gTLD,
      registryOperator,
    });
  }

  try {
    await writeFile('gtlds.json', JSON.stringify(gtlds));
    console.log(COMPLETED.replace('{count}', gtlds.length));
  } catch (error) {
    console.log(ERROR_SAVING, error);
  }
} catch (error) {
  console.log(ERROR_FETCHING, error.response.body);
}
