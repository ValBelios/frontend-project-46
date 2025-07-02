import path from 'path'
import { fileURLToPath } from 'url'
import { describe, test, expect } from '@jest/globals'
import readFile from '../src/readFile.js'
import { genState } from '../src/gendiff.js'
import stylish from '../src/formatters/stylish.js'
import plain from '../src/formatters/plain.js'
import json from '../src/formatters/json.js'
import expectedStylish from '../__fixtures__/expected-stylish.js'
import expectedPlain from '../__fixtures__/expected-plain.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)

const filepath1 = getFixturePath('nestedFile1.json')
const filepath2 = getFixturePath('nestedFile2.json')

// Читаем и парсим входные JSON-файлы
const obj1 = readFile(filepath1)
const obj2 = readFile(filepath2)

// Строим дифф-структуру (а не строку!)
const diff = genState(obj1, obj2)

const formatters = [
  ['stylish', stylish, expectedStylish],
  ['plain', plain, expectedPlain],
  ['json', json, JSON.stringify(diff)],
]

describe('Форматтеры', () => {
  test.each(formatters)(
    'форматтер %s работает корректно',
    (name, formatter, expected) => {
      const result = formatter(diff)

      if (name === 'json') {
        expect(() => JSON.parse(result)).not.toThrow()
        expect(JSON.parse(result)).toEqual(diff)
      } 
      else {
        const expectedString = Array.isArray(expected) ? expected.join('\n') : expected
        expect(result.trim().split('\n')).toEqual(expectedString.trim().split('\n'))
      }
    },
  )
})
