import { AiFullModelCard, LobeDefaultAiModelListItem } from '@/types/aiModel';

import { default as ai360 } from './ai360';
import { default as anthropic } from './anthropic';
import { default as azureai } from './azureai';
import { default as baichuan } from './baichuan';
import { default as deepseek } from './deepseek';
import { default as fal } from './fal';
import { default as github } from './github';
import { default as google } from './google';
import { default as hunyuan } from './hunyuan';
import { default as lmstudio } from './lmstudio';
import { default as minimax } from './minimax';
import { default as modelscope } from './modelscope';
import { default as moonshot } from './moonshot';
import { default as openai } from './openai';
import { default as openrouter } from './openrouter';
import { default as qwen } from './qwen';
import { default as sensenova } from './sensenova';
import { default as siliconcloud } from './siliconcloud';
import { default as spark } from './spark';
import { default as stepfun } from './stepfun';
import { default as tencentcloud } from './tencentcloud';
import { default as vertexai } from './vertexai';
import { default as volcengine } from './volcengine';
import { default as wenxin } from './wenxin';
import { default as xai } from './xai';
import { default as zeroone } from './zeroone';
import { default as zhipu } from './zhipu';

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
  ai360,
  anthropic,
  azureai,
  baichuan,
  deepseek,
  fal,
  github,
  google,
  hunyuan,
  lmstudio,
  minimax,
  modelscope,
  moonshot,
  openai,
  openrouter,
  qwen,
  sensenova,
  siliconcloud,
  spark,
  stepfun,
  tencentcloud,
  vertexai,
  volcengine,
  wenxin,
  xai,
  zeroone,
  zhipu,
});

export { default as ai360 } from './ai360';
export { default as anthropic } from './anthropic';
export { default as azureai } from './azureai';
export { default as baichuan } from './baichuan';
export { default as deepseek } from './deepseek';
export { default as fal } from './fal';
export { default as github } from './github';
export { default as google } from './google';
export { default as hunyuan } from './hunyuan';
export { default as lmstudio } from './lmstudio';
export { default as lobehub } from './lobehub';
export { default as minimax } from './minimax';
export { default as modelscope } from './modelscope';
export { default as moonshot } from './moonshot';
export { default as openai } from './openai';
export { default as openrouter } from './openrouter';
export { default as qwen } from './qwen';
export { default as sensenova } from './sensenova';
export { default as siliconcloud } from './siliconcloud';
export { default as spark } from './spark';
export { default as stepfun } from './stepfun';
export { default as tencentcloud } from './tencentcloud';
export { default as vertexai } from './vertexai';
export { default as volcengine } from './volcengine';
export { default as wenxin } from './wenxin';
export { default as xai } from './xai';
export { default as zeroone } from './zeroone';
export { default as zhipu } from './zhipu';
