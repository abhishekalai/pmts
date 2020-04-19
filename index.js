#!/usr/bin/env node

const yargs = require('yargs');
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');

const options = yargs
  .usage('Usage: colis -c <postman_collection_file> -o <output_file>')
  .option('c', {
    alias: 'collection',
    describe: 'Postman Collection file',
    type: 'string',
    demandOption: true,
  })
  .option('o', {
    alias: 'out',
    describe: 'Output file path',
    type: 'string',
    demandOption: true,
  })
  .argv;
let collection = fs.readFileSync(path.join('./', options.c));
collection = JSON.parse(collection);
const outputPath = path.join('./', options.o);

const compiled = ejs.compile(fs.readFileSync('./templates/main.ejs', 'utf8'), collection);
fs.writeFileSync(outputPath, compiled({ collection }));
process.exit();
