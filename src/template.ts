import { ApiResponse, Client } from '@elastic/elasticsearch';
import { IndicesPutIndexTemplate } from '@elastic/elasticsearch/api/requestParams';

export interface Analysis {
  analyzer?: {
    [key: string]: {
      tokenizer?: string
      filter?: string[]
    }
  }
}

export interface IndexSettings {
  max_result_window?: number
}

export interface Template {
  index_patterns: string[]
  version?: number
  // priority?: number
  // composed_from?: string[]
  mappings?: {
    properties?: {
      [key: string]: any
    }
  }
  settings?: {
    number_of_shards?: number
    number_of_replicas?: number
    analysis?: Analysis
    index?: IndexSettings
  }
  aliases?: {
    [key: string]: any
  }
  _meta?: {
    [key: string]: any
  }
}

export function putTemplate(
  es: Client, name: string, template: Template,
): Promise<ApiResponse> {
  const params: IndicesPutIndexTemplate = {
    name,
    body: template,
  };
  return es.indices.putTemplate(params);
}
