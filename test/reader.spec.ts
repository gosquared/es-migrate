import { Client } from '@elastic/elasticsearch';
import Reader from '../src/reader';

describe.skip('reader', () => {
  it('starts scroll', () => {
    const client = new Client({ node: 'http://localhost:9200' });
    const reader = new Reader(client);
  });
});
