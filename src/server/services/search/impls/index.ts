import { AnspireImpl } from './anspire';
import { BochaImpl } from './bocha';
import { BraveImpl } from './brave';
import { ExaImpl } from './exa';
import { FirecrawlImpl } from './firecrawl';
import { GoogleImpl } from './google';
import { KagiImpl } from './kagi';
import { SearXNGImpl } from './searxng';
import { TavilyImpl } from './tavily';

import { SearchServiceImpl } from './type';

/**
 * Available search service implementations
 */
export enum SearchImplType {
  Anspire = 'anspire',
  Bocha = 'bocha',
  Brave = 'brave',
  Exa = 'exa',
  Firecrawl = 'firecrawl',
  Google = 'google',
  Kagi = 'kagi',
  SearXNG = 'searxng',
  Tavily = 'tavily',
}

/**
 * Create a search service implementation instance
 */
export const createSearchServiceImpl = (
  type: SearchImplType = SearchImplType.SearXNG,
): SearchServiceImpl => {
  switch (type) {
    case SearchImplType.Anspire: {
      return new AnspireImpl();
    }

    case SearchImplType.Bocha: {
      return new BochaImpl();
    }

    case SearchImplType.Brave: {
      return new BraveImpl();
    }

    case SearchImplType.Exa: {
      return new ExaImpl();
    }

    case SearchImplType.Firecrawl: {
      return new FirecrawlImpl();
    }

    case SearchImplType.Google: {
      return new GoogleImpl();
    }

    case SearchImplType.Kagi: {
      return new KagiImpl();
    }

    case SearchImplType.SearXNG: {
      return new SearXNGImpl();
    }

    case SearchImplType.Tavily: {
      return new TavilyImpl();
    }

    default: {
      return new SearXNGImpl();
    }
  }
};

export type { SearchServiceImpl } from './type';
