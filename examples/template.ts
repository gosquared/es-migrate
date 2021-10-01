import { putTemplate, Template } from '../src/template';

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

const template: Template = {
  index_patterns: ['index1'],
  mappings,
  settings,
};

export async function main() {
  const name = 'index1';
  await putTemplate(es, name, template);
}

main();
