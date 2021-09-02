import { Client } from '@elastic/elasticsearch';
import { Readable } from 'stream';

export default class Reader extends Readable {
  es: Client

  constructor(es: Client) {
    super();
    this.es = es;
  }

  async start(index: string | string[]) {
    const scroll = '1m';
    const size = 1000;
    const params = { index, scroll, size };
    const result = await this.es.search(params);
  }

  scroll() {

  }
}
