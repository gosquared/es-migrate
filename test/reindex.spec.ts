import { Client } from 'elasticsearch';
import { Client as Client2 } from '@elastic/elasticsearch';
import { Reindex } from '@elastic/elasticsearch/api/requestParams';

const client = new Client({ host: 'http://localhost:9250' });
const client2 = new Client2({ node: 'http://localhost:9245' });

const refresh = () => client.indices.refresh({ index: '_all' });

describe('reindex', () => {
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

  // https://www.elastic.co/guide/en/elasticsearch/reference/7.10/docs-reindex.html#reindex-from-remote
  const reindexDocument = async () => {
    const host = 'http://es-migrate-es1:9200';
    const remote = { host };
    const index = 'test';
    const query = { match_all: {} };
    const source = { remote, index, query };
    const dest = { index };
    const body = { source, dest };
    const params: Reindex = { body };
    const result = await client2.reindex(params);
    console.log(JSON.stringify(result));
  };

  before(createDocument);
  before(refresh);
  before(reindexDocument);

  it('reindexes document', async () => {
    const index = 'test';
    const id = '1';
    const params = { index, id };
    const result = await client2.get(params);
    console.log(result);
  });
});
