import { eq } from 'drizzle-orm';

import { messageTranslates, messages } from '@/database/schemas';
import { LobeChatDatabase } from '@/database/type';

import { BaseService } from '../common/base.service';
import { ServiceResult } from '../types';
import {
  MessageTranslateResponse,
  MessageTranslateTriggerRequest,
} from '../types/message-translate.type';
import { ChatService } from './chat.service';

export class MessageTranslateService extends BaseService {
  constructor(db: LobeChatDatabase, userId: string | null) {
    super(db, userId);
  }

  /**
   * 根据消息ID获取翻译信息
   * @param messageId 消息ID
   * @returns 翻译信息
   */
  async getTranslateByMessageId(messageId: string): ServiceResult<MessageTranslateResponse | null> {
    if (!this.userId) {
      throw this.createAuthError('未授权操作');
    }

    this.log('info', '根据消息ID获取翻译信息', { messageId, userId: this.userId });

    try {
      const result = await this.db
        .select()
        .from(messageTranslates)
        .where(eq(messageTranslates.id, messageId))
        .limit(1);

      if (result.length === 0) {
        this.log('info', '未找到翻译信息', { messageId });
        return null;
      }

      const translate = result[0];

      // 检查是否属于当前用户
      if (translate.userId !== this.userId) {
        throw this.createAuthorizationError('无权限访问此翻译');
      }

      const response: MessageTranslateResponse = {
        clientId: translate.clientId,
        content: translate.content,
        from: translate.from,
        id: translate.id,
        to: translate.to,
        userId: translate.userId,
      };

      this.log('info', '获取翻译信息完成', { messageId });
      return response;
    } catch (error) {
      if (error instanceof Error && error.name === 'AuthorizationError') {
        throw error;
      }
      this.log('error', '获取翻译信息失败', {
        error: error instanceof Error ? error.message : String(error),
        messageId,
      });
      throw this.createCommonError('查询翻译信息失败');
    }
  }

  /**
   * 创建或更新消息翻译
   * @param translateData 翻译数据
   * @returns 翻译结果
   */
  async translateMessage(translateData: MessageTranslateTriggerRequest): ServiceResult<void> {
    if (!this.userId) {
      throw this.createAuthError('未授权操作');
    }

    this.log('info', '开始翻译消息', {
      from: translateData.from,
      messageId: translateData.messageId,
      to: translateData.to,
      userId: this.userId,
    });

    try {
      // 首先获取原始消息内容
      const originalMessage = await this.getOriginalMessageContent(translateData.messageId);
      if (!originalMessage) {
        throw this.createCommonError('未找到要翻译的消息');
      }

      // 使用ChatService进行翻译
      const chatService = new ChatService(this.db, this.userId);
      const translatedContent = await chatService.translate({
        fromLanguage: translateData.from,
        text: originalMessage,
        toLanguage: translateData.to,
      });

      // 使用 upsert 操作：如果存在则更新，不存在则插入
      await this.db
        .insert(messageTranslates)
        .values({
          content: translatedContent,
          from: translateData.from,
          id: translateData.messageId,
          to: translateData.to,
          userId: this.userId,
        })
        .onConflictDoUpdate({
          set: {
            content: translatedContent,
            from: translateData.from,
            to: translateData.to,
          },
          target: messageTranslates.id,
        });

      this.log('info', '翻译消息完成', { messageId: translateData.messageId });
    } catch (error) {
      this.log('error', '翻译消息失败', {
        error: error instanceof Error ? error.message : String(error),
        messageId: translateData.messageId,
      });
      throw this.createCommonError('翻译消息失败');
    }
  }

  /**
   * 获取原始消息内容
   * @param messageId 消息ID
   * @returns 消息内容
   */
  private async getOriginalMessageContent(messageId: string): Promise<string | null> {
    try {
      const result = await this.db
        .select({ content: messages.content })
        .from(messages)
        .where(eq(messages.id, messageId))
        .limit(1);

      return result[0]?.content || null;
    } catch (error) {
      this.log('error', '获取原始消息内容失败', {
        error: error instanceof Error ? error.message : String(error),
        messageId,
      });
      return null;
    }
  }
}
