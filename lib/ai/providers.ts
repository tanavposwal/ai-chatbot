import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from 'ai';
import { google } from '@ai-sdk/google';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';

const openrouter = createOpenRouter({
  apiKey: process.env.OPEN_ROUTER_API_KEY,
});

export const myProvider = customProvider({
      languageModels: {
        'gemini-2.5-flash': google('gemini-2.5-flash-preview-04-17'),
        'artifact-model': openrouter.chat('deepseek/deepseek-r1-zero:free'),
        'deepseek-r1': openrouter.chat('deepseek/deepseek-r1-zero:free'),
        'qwen-qwq-32b': openrouter.chat('qwen/qwq-32b:free'),
        'title-model': google('gemini-2.0-flash-lite'),
      },
      // imageModels: {
      //   'small-model': xai.image('grok-2-image'),
      // },
    });
