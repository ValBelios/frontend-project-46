import formatDiff from './formatters/index.js';
import readFile from './readFile.js';

const getAllKeysSorted = (obj1, obj2) => {
  const allKeys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);
  return [...allKeys].sort();
};

const isPlainObject = (val) =>
  typeof val === 'object' && val !== null && !Array.isArray(val);

const genState = (obj1, obj2) => {
  const keys = getAllKeysSorted(obj1, obj2);

  return keys.map((key) => {
    const oldValue = obj1[key];
    const newValue = obj2[key];

    const isOldObj = isPlainObject(oldValue);
    const isNewObj = isPlainObject(newValue);

    if (!Object.hasOwn(obj2, key)) {
      return { key, type: 'removed', value: oldValue };
    }

    if (!Object.hasOwn(obj1, key)) {
      return { key, type: 'added', value: newValue };
    }

    if (isOldObj && isNewObj) {
      return { key, type: 'nested', children: genState(oldValue, newValue) };
    }

    if (oldValue !== newValue) {
      return { key, type: 'changed', oldValue, newValue };
    }

    return { key, type: 'unchanged', value: oldValue };
  });
};

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const object1 = readFile(filepath1);
  const object2 = readFile(filepath2);

  const diff = genState(object1, object2);

  return formatDiff(diff, format);
};

export default genDiff;
export { genState };
