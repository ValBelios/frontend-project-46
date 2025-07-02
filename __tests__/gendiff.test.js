import { test, expect } from '@jest/globals'
import path from 'path'
import { fileURLToPath } from 'url'
import genDiff from '../src/index.js'// именно index.js, потому что он обрабатывает аргументы

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)

test('gendiff json format', () => {
  const filepath1 = getFixturePath('nestedFile1.json')
  const filepath2 = getFixturePath('nestedFile2.json')
  const diff = genDiff(filepath1, filepath2, 'json')

  const parsed = JSON.parse(diff)

  expect(parsed).toBeInstanceOf(Array)
  expect(parsed).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ key: 'common', type: 'nested' }),
    ]),
  )
})
