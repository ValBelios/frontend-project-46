import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';

// Получение абсолютного пути
const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);

// Определение формата файла по расширению
const getFormat = (filepath) => path.extname(filepath).toLowerCase();

// Чтение и парсинг файла
const parse = (filepath) => {
  const absolutePath = getAbsolutePath(filepath);
  const data = fs.readFileSync(absolutePath, 'utf-8');
  const format = getFormat(filepath);

  if (format === '.json') {
    return JSON.parse(data);
  }
  if (format === '.yml' || format === '.yaml') {
    return yaml.load(data);
  }

  throw new Error(`Unsupported file format: ${format}`);
};

// Функция сравнения
const genDiff = (filepath1, filepath2) => {
  const obj1 = parse(filepath1);
  const obj2 = parse(filepath2);

  const keys = Array.from(new Set([...Object.keys(obj1), ...Object.keys(obj2)])).sort();

  const result = keys.map((key) => {
    if (!Object.hasOwn(obj2, key)) {
      return `  - ${key}: ${obj1[key]}`;
    }
    if (!Object.hasOwn(obj1, key)) {
      return `  + ${key}: ${obj2[key]}`;
    }
    if (obj1[key] !== obj2[key]) {
      return `  - ${key}: ${obj1[key]}\n  + ${key}: ${obj2[key]}`;
    }
    return `    ${key}: ${obj1[key]}`;
  });

  return `{\n${result.join('\n')}\n}`;
};

export default genDiff;
