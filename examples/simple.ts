import { pipeline } from 'stream';

function createQuery() {
  const query = { match_all: {} };
  return { query };
}

const { FROM_ES } = process.env;
const { TO_ES } = process.env;

const source = new Reader(FROM_ES);
const destination = new Writer(TO_ES);
source.query(createQuery());

async function main() {
  await pipeline(source, destination);
}

main();
