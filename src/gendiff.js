import fs from 'fs';
import path from 'path';
import parse from './parsers.js';

const getFormat = (filepath) => path.extname(filepath).slice(1); // без точки

const getData = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  const data = fs.readFileSync(absolutePath, 'utf-8');
  const format = getFormat(filepath);
  return parse(data, format);
};
