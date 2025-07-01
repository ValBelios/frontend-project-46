import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);
const getFormat = (filepath) => path.extname(filepath).toLowerCase();

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

export default parse;

