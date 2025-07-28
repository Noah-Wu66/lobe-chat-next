import { LobeAi360AI } from './ai360';
import { LobeAnthropicAI } from './anthropic';
import { LobeAzureOpenAI } from './azureOpenai';
import { LobeAzureAI } from './azureai';
import { LobeBaichuanAI } from './baichuan';
import { LobeDeepSeekAI } from './deepseek';
import { LobeFalAI } from './fal';
import { LobeGithubAI } from './github';
import { LobeGoogleAI } from './google';
import { LobeHunyuanAI } from './hunyuan';
import { LobeLMStudioAI } from './lmstudio';
import { LobeMinimaxAI } from './minimax';
import { LobeModelScopeAI } from './modelscope';
import { LobeMoonshotAI } from './moonshot';
import { LobeOpenAI } from './openai';
import { LobeOpenRouterAI } from './openrouter';
import { LobeQwenAI } from './qwen';
import { LobeSenseNovaAI } from './sensenova';
import { LobeSiliconCloudAI } from './siliconcloud';
import { LobeSparkAI } from './spark';
import { LobeStepfunAI } from './stepfun';
import { LobeTencentCloudAI } from './tencentcloud';
import { LobeVolcengineAI } from './volcengine';
import { LobeWenxinAI } from './wenxin';
import { LobeXAI } from './xai';
import { LobeZeroOneAI } from './zeroone';
import { LobeZhipuAI } from './zhipu';

export const providerRuntimeMap = {
  ai360: LobeAi360AI,
  anthropic: LobeAnthropicAI,
  azure: LobeAzureOpenAI,
  azureai: LobeAzureAI,
  baichuan: LobeBaichuanAI,
  deepseek: LobeDeepSeekAI,
  fal: LobeFalAI,
  github: LobeGithubAI,
  google: LobeGoogleAI,
  hunyuan: LobeHunyuanAI,
  lmstudio: LobeLMStudioAI,
  minimax: LobeMinimaxAI,
  modelscope: LobeModelScopeAI,
  moonshot: LobeMoonshotAI,
  openai: LobeOpenAI,
  openrouter: LobeOpenRouterAI,
  qwen: LobeQwenAI,
  sensenova: LobeSenseNovaAI,
  siliconcloud: LobeSiliconCloudAI,
  spark: LobeSparkAI,
  stepfun: LobeStepfunAI,
  tencentcloud: LobeTencentCloudAI,
  volcengine: LobeVolcengineAI,
  wenxin: LobeWenxinAI,
  xai: LobeXAI,
  zeroone: LobeZeroOneAI,
  zhipu: LobeZhipuAI,
};
