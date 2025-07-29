import { LobeAnthropicAI } from './anthropic';
import { LobeAzureOpenAI } from './azureOpenai';
import { LobeDeepSeekAI } from './deepseek';
import { LobeGoogleAI } from './google';
import { LobeMoonshotAI } from './moonshot';
import { LobeOpenAI } from './openai';
import { LobeOpenRouterAI } from './openrouter';
import { LobeXAI } from './xai';

export const providerRuntimeMap = {
  anthropic: LobeAnthropicAI,
  azure: LobeAzureOpenAI,
  deepseek: LobeDeepSeekAI,
  google: LobeGoogleAI,
  moonshot: LobeMoonshotAI,
  openai: LobeOpenAI,
  openrouter: LobeOpenRouterAI,
  xai: LobeXAI,
};
