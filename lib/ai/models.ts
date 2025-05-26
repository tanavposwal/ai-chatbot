export const DEFAULT_CHAT_MODEL: string = 'gemini-2.5-flash';

export interface ChatModel {
  id: string;
  name: string;
  description: string;
}

export const chatModels: Array<ChatModel> = [
  {
    id: 'gemini-2.5-flash',
    name: 'Gemini 2.5 Flash',
    description: 'Primary google model for all-purpose chat',
  },
  {
    id: 'deepseek-r1',
    name: 'Deepseek Reasoning Model',
    description: 'Deepseeks flagship model for reasoning',
  },
  {
    id: 'qwen-qwq-32b',
    name: 'Qwens Qwq Model',
    description: 'Qwens most advanced model for reasoning',
  },
];
