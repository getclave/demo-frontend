/* eslint-disable */

const fs = require('fs');
const path = require('path');

function main() {
  const args = process.argv;

  if (args.length === 2) {
    console.log('Please specify an input and output file');
    return;
  } else if (args.length === 3) {
    console.log('Please specify an output file');
    return;
  }

  const inputPath = args[args.length - 2];
  const outputPath = args[args.length - 1];
  const split = outputPath.split('/');
  const fileSplit = split[split.length - 1];
  const fileName = fileSplit.slice(0, fileSplit.lastIndexOf('.'));
  const filePath = path.join(inputPath);

  fs.readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    try {
      const json = JSON.parse(data);
      const doc = new ContractFile(inputPath, outputPath);
      doc.addLine(`import { useAddress } from '@ethylene/hooks'`);
      doc.addBreak();
      doc
        .addLine(`export function ${fileName}(): EthyleneContract {`)
        .addBreak();
      doc.addLine(`}`);

      try {
        doc.createFile();
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log('Invalid input file');
    }
  });
}

main();

class ContractFile {
  content;
  inputPath;
  outputPath;
  constructor(inputPath, outputPath) {
    this.content = '';
    this.inputPath = inputPath;
    this.outputPath = outputPath;
  }

  addLine(str) {
    this.content = this.content + str + '\n';
    return this;
  }

  addBreak(count = 1) {
    for (let i = 0; i < count; i++) {
      this.content = this.content + '\n';
    }
    return this;
  }

  getContent() {
    return this.content;
  }

  createFile() {
    fs.writeFile(
      this.outputPath,
      this.content,
      { encoding: 'utf-8' },
      (err) => {
        if (err != null) {
          console.log(err);
        } else {
          console.log('===========================\n');
          console.log('File created successfully\n');
          console.log('===========================\n');
        }
      },
    );
  }
}
