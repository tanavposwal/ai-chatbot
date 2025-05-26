import type { UserType } from '@/app/(auth)/auth';
import type { ChatModel } from './models';

interface Entitlements {
  maxMessagesPerDay: number;
  availableChatModelIds: Array<ChatModel['id']>;
}

export const entitlementsByUserType: Record<UserType, Entitlements> = {
  /*
   * For users without an account
   */
  guest: {
    maxMessagesPerDay: 20,
    availableChatModelIds: ['gemini-2.5-flash', 'deepseek-r1', 'qwen-qwq-32b'],
  },

  /*
   * For users with an account
   */
  regular: {
    maxMessagesPerDay: 100,
    availableChatModelIds: ['gemini-2.5-flash', 'deepseek-r1', 'qwen-qwq-32b'],
  },

  /*
   * TODO: For users with an account and a paid membership
   */
};
