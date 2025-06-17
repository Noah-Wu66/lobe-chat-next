import { eq } from 'drizzle-orm';

import { topics } from '@/database/schemas';
import { LobeChatDatabase } from '@/database/type';

import { BaseService } from '../common/base.service';
import { TopicResponse } from '../types/topic.type';

export class TopicService extends BaseService {
  constructor(db: LobeChatDatabase, userId: string | null) {
    super(db, userId);
  }

  /**
   * 获取指定会话的所有话题
   * @param sessionId 会话ID
   * @returns 话题列表
   */
  async getTopicsBySessionId(sessionId: string): Promise<TopicResponse[]> {
    if (!this.userId) {
      throw this.createAuthError('未授权操作');
    }

    try {
      const result = await this.db
        .select()
        .from(topics)
        .where(eq(topics.sessionId, sessionId))
        .orderBy(topics.createdAt);

      return result.map((topic) => ({
        clientId: topic.clientId,
        createdAt: topic.createdAt.toISOString(),
        favorite: topic.favorite || false,
        historySummary: topic.historySummary,
        id: topic.id,
        metadata: topic.metadata,
        sessionId: topic.sessionId,
        title: topic.title,
        updatedAt: topic.updatedAt.toISOString(),
        userId: topic.userId,
      }));
    } catch (error) {
      this.log('error', 'Failed to get topics by session ID', { error, sessionId });
      throw this.createCommonError('获取话题列表失败');
    }
  }

  /**
   * 创建新的话题
   * @param sessionId 会话ID
   * @param title 话题标题
   * @returns 创建的话题信息
   */
  async createTopic(sessionId: string, title: string): Promise<TopicResponse> {
    if (!this.userId) {
      throw this.createAuthError('未授权操作');
    }

    try {
      const [newTopic] = await this.db
        .insert(topics)
        .values({
          favorite: false,
          sessionId,
          title,
          userId: this.userId,
        })
        .returning();

      return {
        clientId: newTopic.clientId,
        createdAt: newTopic.createdAt.toISOString(),
        favorite: newTopic.favorite || false,
        historySummary: newTopic.historySummary,
        id: newTopic.id,
        metadata: newTopic.metadata,
        sessionId: newTopic.sessionId,
        title: newTopic.title,
        updatedAt: newTopic.updatedAt.toISOString(),
        userId: newTopic.userId,
      };
    } catch (error) {
      this.log('error', 'Failed to create topic', { error, sessionId, title });
      throw this.createCommonError('创建话题失败');
    }
  }

  /**
   * 总结对应的话题
   * @param topicId 话题ID
   * @returns 更新后的话题信息
   */
  async summarizeTopic(topicId: string): Promise<TopicResponse> {
    if (!this.userId) {
      throw this.createAuthError('未授权操作');
    }

    try {
      // 首先检查话题是否存在且属于当前用户
      const existingTopic = await this.db
        .select()
        .from(topics)
        .where(eq(topics.id, topicId))
        .limit(1);

      if (existingTopic.length === 0) {
        throw this.createCommonError('话题不存在');
      }

      if (existingTopic[0].userId !== this.userId) {
        throw this.createAuthorizationError('无权限操作此话题');
      }

      // TODO: 这里应该集成AI服务来生成真正的摘要
      // 目前先使用一个简单的摘要逻辑
      const summary = `${existingTopic[0].title || '未命名话题'} 的对话摘要`;

      const [updatedTopic] = await this.db
        .update(topics)
        .set({
          historySummary: summary,
          updatedAt: new Date(),
        })
        .where(eq(topics.id, topicId))
        .returning();

      return {
        clientId: updatedTopic.clientId,
        createdAt: updatedTopic.createdAt.toISOString(),
        favorite: updatedTopic.favorite || false,
        historySummary: updatedTopic.historySummary,
        id: updatedTopic.id,
        metadata: updatedTopic.metadata,
        sessionId: updatedTopic.sessionId,
        title: updatedTopic.title,
        updatedAt: updatedTopic.updatedAt.toISOString(),
        userId: updatedTopic.userId,
      };
    } catch (error) {
      if (
        error instanceof Error &&
        (error.name === 'BusinessError' || error.name === 'AuthorizationError')
      ) {
        throw error;
      }
      this.log('error', 'Failed to summarize topic', {
        error: error instanceof Error ? error.message : String(error),
        topicId,
      });
      throw this.createCommonError('总结话题失败');
    }
  }
}
