#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from '../src/gendiff.js';
import path from 'path';
import { fileURLToPath } from 'url';

const program = new Command();

program
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .action((filepath1, filepath2) => {
    const fullPath1 = path.resolve(filepath1);
    const fullPath2 = path.resolve(filepath2);
    console.log(genDiff(fullPath1, fullPath2));
  });

program.parse();
