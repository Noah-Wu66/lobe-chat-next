import { ChatModelCard, ModelProviderCard } from '@/types/llm';

import Ai360Provider from './ai360';
import AnthropicProvider from './anthropic';
import AzureAIProvider from './azureai';
import BaichuanProvider from './baichuan';
import DeepSeekProvider from './deepseek';
import FalProvider from './fal';
import GithubProvider from './github';
import GoogleProvider from './google';
import HunyuanProvider from './hunyuan';
import LMStudioProvider from './lmstudio';
import MinimaxProvider from './minimax';
import ModelScopeProvider from './modelscope';
import MoonshotProvider from './moonshot';
import OpenAIProvider from './openai';
import OpenRouterProvider from './openrouter';
import QwenProvider from './qwen';
import SenseNovaProvider from './sensenova';
import SiliconCloudProvider from './siliconcloud';
import SparkProvider from './spark';
import StepfunProvider from './stepfun';
import TencentcloudProvider from './tencentcloud';
import VertexAIProvider from './vertexai';
import VolcengineProvider from './volcengine';
import WenxinProvider from './wenxin';
import XAIProvider from './xai';
import ZeroOneProvider from './zeroone';
import ZhiPuProvider from './zhipu';

/**
 * @deprecated
 */
export const LOBE_DEFAULT_MODEL_LIST: ChatModelCard[] = [
  OpenAIProvider.chatModels,
  QwenProvider.chatModels,
  ZhiPuProvider.chatModels,
  DeepSeekProvider.chatModels,
  GoogleProvider.chatModels,
  GithubProvider.chatModels,
  MinimaxProvider.chatModels,
  ModelScopeProvider.chatModels,
  MoonshotProvider.chatModels,
  OpenRouterProvider.chatModels,
  AnthropicProvider.chatModels,
  XAIProvider.chatModels,
  ZeroOneProvider.chatModels,
  StepfunProvider.chatModels,
  BaichuanProvider.chatModels,
  Ai360Provider.chatModels,
  SiliconCloudProvider.chatModels,
  SparkProvider.chatModels,
  HunyuanProvider.chatModels,
  WenxinProvider.chatModels,
  SenseNovaProvider.chatModels,
].flat();

export const DEFAULT_MODEL_PROVIDER_LIST = [
  OpenAIProvider,
  AzureAIProvider,
  AnthropicProvider,
  GoogleProvider,
  VertexAIProvider,
  DeepSeekProvider,
  OpenRouterProvider,
  FalProvider,
  GithubProvider,
  ModelScopeProvider,
  XAIProvider,
  QwenProvider,
  WenxinProvider,
  TencentcloudProvider,
  HunyuanProvider,
  ZhiPuProvider,
  SiliconCloudProvider,
  ZeroOneProvider,
  SparkProvider,
  SenseNovaProvider,
  StepfunProvider,
  MoonshotProvider,
  BaichuanProvider,
  VolcengineProvider,
  MinimaxProvider,
  LMStudioProvider,
  Ai360Provider,
];

export const filterEnabledModels = (provider: ModelProviderCard) => {
  return provider.chatModels.filter((v) => v.enabled).map((m) => m.id);
};

export const isProviderDisableBrowserRequest = (id: string) => {
  const provider = DEFAULT_MODEL_PROVIDER_LIST.find((v) => v.id === id && v.disableBrowserRequest);
  return !!provider;
};

export { default as Ai360ProviderCard } from './ai360';
export { default as AnthropicProviderCard } from './anthropic';
export { default as AzureAIProviderCard } from './azureai';
export { default as BaichuanProviderCard } from './baichuan';
export { default as DeepSeekProviderCard } from './deepseek';
export { default as FalProviderCard } from './fal';
export { default as GithubProviderCard } from './github';
export { default as GoogleProviderCard } from './google';
export { default as HunyuanProviderCard } from './hunyuan';
export { default as LMStudioProviderCard } from './lmstudio';
export { default as LobeHubProviderCard } from './lobehub';
export { default as MinimaxProviderCard } from './minimax';
export { default as ModelScopeProviderCard } from './modelscope';
export { default as MoonshotProviderCard } from './moonshot';
export { default as OpenAIProviderCard } from './openai';
export { default as OpenRouterProviderCard } from './openrouter';
export { default as QwenProviderCard } from './qwen';
export { default as SenseNovaProviderCard } from './sensenova';
export { default as SiliconCloudProviderCard } from './siliconcloud';
export { default as SparkProviderCard } from './spark';
export { default as StepfunProviderCard } from './stepfun';
export { default as TencentCloudProviderCard } from './tencentcloud';
export { default as VertexAIProviderCard } from './vertexai';
export { default as VolcengineProviderCard } from './volcengine';
export { default as WenxinProviderCard } from './wenxin';
export { default as XAIProviderCard } from './xai';
export { default as ZeroOneProviderCard } from './zeroone';
export { default as ZhiPuProviderCard } from './zhipu';
