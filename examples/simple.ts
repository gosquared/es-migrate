import { pipeline } from 'stream';
import Reader from '../src/reader';

const { FROM_ES, TO_ES } = process.env;

const source = new Reader(FROM_ES);
const destination = new Writer(TO_ES);

source.start(['index-*']);

async function main() {
  await pipeline(source, destination);
}

main();
