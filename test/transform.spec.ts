import { Client } from 'elasticsearch';
import { Client as Client2 } from '@elastic/elasticsearch';
import { Get, Reindex } from '@elastic/elasticsearch/api/requestParams';
import { expect } from 'chai';

const client = new Client({ host: 'http://localhost:9250' });
const client2 = new Client2({ node: 'http://localhost:9245' });

const refresh = () => client.indices.refresh({ index: '_all' });

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

const reindexDocument = async () => {
  const host = 'http://es-migrate-es1:9200';
  const remote = { host };
  const index = 'test';
  const query = { match_all: {} };
  const source = { remote, index, query };
  const dest = { index };
  const src = 'ctx._source.ty = ctx._type';
  const script = { source: src, lang: 'painless' };
  const body = { source, dest, script };
  const params: Reindex = { body };
  const result = await client2.reindex(params);
  console.log(JSON.stringify(result));
};

describe('transform', () => {
  before(createDocument);
  before(refresh);
  before(reindexDocument);

  it('adds type field', async () => {
    const index = 'test';
    const id = '1';
    const params: Get = { index, id };
    const result = await client2.get(params);
    expect(result.body._source.ty).to.equal('test');
  });
});
