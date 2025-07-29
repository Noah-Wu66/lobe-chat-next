import { AiFullModelCard, LobeDefaultAiModelListItem } from '@/types/aiModel';

import { default as anthropic } from './anthropic';
import { default as deepseek } from './deepseek';
import { default as google } from './google';
import { default as moonshot } from './moonshot';
import { default as openai } from './openai';
import { default as openrouter } from './openrouter';
import { default as vertexai } from './vertexai';
import { default as xai } from './xai';

type ModelsMap = Record<string, AiFullModelCard[]>;

const buildDefaultModelList = (map: ModelsMap): LobeDefaultAiModelListItem[] => {
  let models: LobeDefaultAiModelListItem[] = [];

  Object.entries(map).forEach(([provider, providerModels]) => {
    const newModels = providerModels.map((model) => ({
      ...model,
      abilities: model.abilities ?? {},
      enabled: model.enabled || false,
      providerId: provider,
      source: 'builtin',
    }));
    models = models.concat(newModels);
  });

  return models;
};

export const LOBE_DEFAULT_MODEL_LIST = buildDefaultModelList({
  anthropic,
  deepseek,
  google,
  moonshot,
  openai,
  openrouter,
  vertexai,
  xai,
});

export { default as anthropic } from './anthropic';
export { default as deepseek } from './deepseek';
export { default as google } from './google';
export { default as lobehub } from './lobehub';
export { default as moonshot } from './moonshot';
export { default as openai } from './openai';
export { default as openrouter } from './openrouter';
export { default as vertexai } from './vertexai';
export { default as xai } from './xai';
