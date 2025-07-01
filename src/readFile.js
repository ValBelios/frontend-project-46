// src/readFile.js
import fs from 'fs';
import path from 'path';
import parse from './parsers.js';

const readFile = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  const extname = path.extname(fullPath);
  const data = fs.readFileSync(fullPath, 'utf-8');
  return parse(data, extname);
};

export default readFile;
