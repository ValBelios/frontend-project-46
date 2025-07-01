import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatters = {
  stylish,
  plain,
  json,
};

export default (diffTree, formatName = 'stylish') => {
  if (!formatters[formatName]) {
    throw new Error(`Unknown format: ${formatName}`);
  }
  return formatters[formatName](diffTree);
};

