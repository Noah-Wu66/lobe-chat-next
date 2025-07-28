import { useMemo } from 'react';

import {
  Ai360ProviderCard,
  AnthropicProviderCard,
  BaichuanProviderCard,
  DeepSeekProviderCard,
  GoogleProviderCard,
  HunyuanProviderCard,
  MinimaxProviderCard,
  MoonshotProviderCard,
  OpenRouterProviderCard,
  QwenProviderCard,
  SenseNovaProviderCard,
  SiliconCloudProviderCard,
  SparkProviderCard,
  StepfunProviderCard,
  WenxinProviderCard,
  XAIProviderCard,
  ZeroOneProviderCard,
  ZhiPuProviderCard,
} from '@/config/modelProviders';

import { ProviderItem } from '../type';
import { useGithubProvider } from './Github';
import { useOpenAIProvider } from './OpenAI';

export const useProviderList = (): ProviderItem[] => {
  const OpenAIProvider = useOpenAIProvider();
  const GithubProvider = useGithubProvider();

  return useMemo(
    () => [
      OpenAIProvider,
      AnthropicProviderCard,
      GoogleProviderCard,
      DeepSeekProviderCard,
      OpenRouterProviderCard,
      GithubProvider,
      XAIProviderCard,
      QwenProviderCard,
      WenxinProviderCard,
      HunyuanProviderCard,
      SparkProviderCard,
      ZhiPuProviderCard,
      ZeroOneProviderCard,
      SenseNovaProviderCard,
      StepfunProviderCard,
      MoonshotProviderCard,
      BaichuanProviderCard,
      MinimaxProviderCard,
      Ai360ProviderCard,
      SiliconCloudProviderCard,
    ],
    [
      OpenAIProvider,
      GithubProvider,
    ],
  );
};
