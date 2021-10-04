# Usage
This is your migration workspace. Here you can set up and test an elasticsearch migration.

It has:
* Local elastisearch containers for testing locally.
* Example scripts to help with common tasks like installing index templates.
* Tooling to set up new elasticsearch clusters.
* Tooling to run the migration itself.

# Set up elasticsearch
Check out [aws-opensearch-refarch](https://github.com/gosquared/aws-opensearch-refarch).

# Install templates
See [examples/template.ts](https://github.com/gosquared/es-migrate/blob/main/examples/template.ts)

# Open network access
Allow your new cluster to connect to the existing one.

For example, on AWS, allow tcp port 9200 in the security group.

# Prepare transforms
Change documents in-flight.

# Test migration

# Run migration

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
