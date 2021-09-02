import { Client } from 'elasticsearch';

describe('reindex', () => {
  const client = new Client({ host: 'http://localhost:9200' });
  const createDocument = async () => {
    await client.index({
      index: 'test',
      type: 'test',
      id: '1',
      body: {
        title: 'foo',
        description: 'bar',
      },
    });
  };

  before(createDocument);

  it('reindexes document');
});
