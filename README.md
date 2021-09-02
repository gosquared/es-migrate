Tool for migrating documents from one cluster to another.

https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/installation.html#js-compatibility-matrix
https://opensearch.org/docs/clients/index/

# Rationale
We were finally upgrading our 2.3 cluster to 7.x. Due to breaking changes, some mappings needed to be changed and documents reindexed. It is easier to migrate direct from 2.x to 7.x than stepping through 5.x and 6.x, although not 'easy' to do either!

Breaking changes that affected us:

* "_type" field deprecated / no longer supported.
*

The Elasticsearch Reindex API is useful but has limited transform options.

Since we work in Javascript we found it easiest to write our transforms in JS.

# Why direct was preferable
If we were to upgrade via 5.x and 6.x, we would need to make our services compatible with each version. Also, each node in the cluster would need to be cycled, involving manual patching and restarting the node - a labour intensive process.
