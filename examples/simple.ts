import { pipeline } from 'stream';

const { FROM_ES, TO_ES } = process.env;

const source = new Reader(FROM_ES);
const destination = new Writer(TO_ES);

async function main() {
  await pipeline(source, destination);
}

main();
