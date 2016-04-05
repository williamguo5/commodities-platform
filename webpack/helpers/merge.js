// Merges settings files together, e.g. base and development or base and production

import mergeWith from 'lodash/mergeWith';

export default (target, source) => (
  mergeWith(target, source, (target, source) => (
    Array.isArray(target) ? [].concat(target, source) : source
  ))
);