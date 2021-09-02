describe('reindex', () => {
  const createDocument = async () => {
    await client.index({
      index: 'test',
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
