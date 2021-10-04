Tool to migrate and transform documents from one cluster to another.

# Install
    npm i @gosquared/es-migrate

# Set up elasticsearch
Check out [aws-opensearch-refarch](https://github.com/gosquared/aws-opensearch-refarch) for tooling.
# Install templates
See [examples/template.ts](https://github.com/gosquared/es-migrate/blob/main/examples/template.ts)
# Open network access
Allow your new cluster to connect to the existing one.

For example, on AWS, allow tcp port 9200 in the security group.
# Transform
Change documents in-flight.

# Start
```bash

```


# Test

```bash
npm test
# or
npm run start-services
npm run watch
npx mocha dist/test
npx mocha --inspect dist/test/transform.spec.js
npx mocha --inspect dist/test/template.spec.js
npm run cleanup
```

```bash
# forward port 5603
docker-compose up -d kibana7
docker-compose stop kibana7
docker-compose rm -f kibana7
# http://localhost:5603/app/dev_tools#/console
```

# es commands
```bash
curl -XGET 'http://localhost:9250/test/_search?pretty'
```

# Rationale
We were finally upgrading our 2.3 cluster to 7.x. Due to breaking changes, some mappings needed to be changed and documents reindexed. It is easier to migrate direct from 2.x to 7.x than stepping through 5.x and 6.x, although not 'easy' to do either!

Breaking changes that affected us:

* "_type" field deprecated / no longer supported.
*

The Elasticsearch Reindex API is useful but has limited transform options.

Since we work in Javascript we found it easiest to write our transforms in JS.

# Why direct was preferable
If we were to upgrade via 5.x and 6.x, we would need to make our services compatible with each version. Also, each node in the cluster would need to be cycled, involving manual patching and restarting the node - a labour intensive process.

# Ignore linting
```bash
git config blame.ignoreRevsFile .ignore-revs
```

https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/installation.html#js-compatibility-matrix

https://opensearch.org/docs/clients/index/
