import { ChatModelCard, ModelProviderCard } from '@/types/llm';

import AnthropicProvider from './anthropic';
import DeepSeekProvider from './deepseek';
import GoogleProvider from './google';
import MoonshotProvider from './moonshot';
import OpenAIProvider from './openai';
import OpenRouterProvider from './openrouter';
import VertexAIProvider from './vertexai';
import XAIProvider from './xai';

/**
 * @deprecated
 */
export const LOBE_DEFAULT_MODEL_LIST: ChatModelCard[] = [
  OpenAIProvider.chatModels,
  DeepSeekProvider.chatModels,
  GoogleProvider.chatModels,
  MoonshotProvider.chatModels,
  OpenRouterProvider.chatModels,
  AnthropicProvider.chatModels,
  XAIProvider.chatModels,
].flat();

export const DEFAULT_MODEL_PROVIDER_LIST = [
  OpenAIProvider,
  AnthropicProvider,
  GoogleProvider,
  VertexAIProvider,
  DeepSeekProvider,
  OpenRouterProvider,
  XAIProvider,
  MoonshotProvider,
];

export const filterEnabledModels = (provider: ModelProviderCard) => {
  return provider.chatModels.filter((v) => v.enabled).map((m) => m.id);
};

export const isProviderDisableBrowserRequest = (id: string) => {
  const provider = DEFAULT_MODEL_PROVIDER_LIST.find((v) => v.id === id && v.disableBrowserRequest);
  return !!provider;
};

export { default as AnthropicProviderCard } from './anthropic';
export { default as DeepSeekProviderCard } from './deepseek';
export { default as GoogleProviderCard } from './google';
export { default as LobeHubProviderCard } from './lobehub';
export { default as MoonshotProviderCard } from './moonshot';
export { default as OpenAIProviderCard } from './openai';
export { default as OpenRouterProviderCard } from './openrouter';
export { default as VertexAIProviderCard } from './vertexai';
export { default as XAIProviderCard } from './xai';
