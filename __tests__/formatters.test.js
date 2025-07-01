import path from 'path';
import { fileURLToPath } from 'url';
import { describe, test, expect } from '@jest/globals';
import genDiff from '../src/gendiff.js';
import stylish from '../src/formatters/stylish.js';
import plain from '../src/formatters/plain.js';
import json from '../src/formatters/json.js';
import expectedStylish from '../__fixtures__/expected-stylish.js';
import expectedPlain from '../__fixtures__/expected-plain.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const filepath1 = getFixturePath('nestedFile1.json');
const filepath2 = getFixturePath('nestedFile2.json');

// Получаем дифф в формате json и парсим его в объект
const parsedDiff = JSON.parse(genDiff(filepath1, filepath2, 'json'));

const formatters = [
  ['stylish', stylish, expectedStylish],
  ['plain', plain, expectedPlain],
  ['json', json, JSON.stringify(parsedDiff)],
];

describe('Форматтеры', () => {
  test.each(formatters)(
    'форматтер %s работает корректно',
    (name, formatter, expected) => {
      const result = formatter(parsedDiff);

      if (name === 'json') {
        expect(() => JSON.parse(result)).not.toThrow();
        expect(JSON.parse(result)).toEqual(parsedDiff);
      } else {
        expect(result.trim().split('\n')).toEqual(expected.trim().split('\n'));
      }
    },
  );
});
