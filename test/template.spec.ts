import { Client } from '@elastic/elasticsearch';
import { expect } from 'chai';
import { putTemplate, Template } from '../src/template';

const es = new Client({ node: 'http://localhost:9245' });

const mappings = {
  properties: {
    field1: {
      type: 'keyword',
    },
  },
};

const settings = {
  number_of_shards: 1,
  number_of_replicas: 0,
};

const indexName = 'index1';

const template: Template = {
  index_patterns: [indexName],
  mappings,
  settings,
};

const name = 'index1';

describe('template', () => {
  before(() => putTemplate(es, name, template));
  it('creates template', async () => {
    const result = await es.indices.getTemplate({ name });
    expect(result.body).to.have.property(name);
    expect(result.body[name].index_patterns[0]).to.equal(indexName);
  });
});
