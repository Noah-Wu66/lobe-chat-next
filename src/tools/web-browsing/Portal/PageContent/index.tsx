import { Alert, CopyButton, Icon, Markdown } from '@lobehub/ui';
import { Descriptions, Segmented, Typography } from 'antd';
import { createStyles } from 'antd-style';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Center, Flexbox } from 'react-layout-kit';

import { CrawlResult } from '@/types/tool/crawler';

const useStyles = createStyles(({ token, css }) => {
  return {
    cardBody: css`
      padding-block: 12px 8px;
      padding-inline: 16px;
    `,
    container: css`
      cursor: pointer;

      overflow: hidden;

      max-width: 360px;
      border: 1px solid ${token.colorBorderSecondary};
      border-radius: 12px;

      transition: border-color 0.2s;

      :hover {
        border-color: ${token.colorPrimary};
      }
    `,
    description: css`
      margin-block: 0 4px !important;
      color: ${token.colorTextSecondary};
    `,
    detailsSection: css`
      padding-block: ${token.paddingSM}px;
    `,
    externalLink: css`
      color: ${token.colorPrimary};
    `,
    footer: css`
      padding: ${token.paddingXS}px;
      border-radius: 6px;
      text-align: center;
      background-color: ${token.colorFillQuaternary};
    `,
    footerText: css`
      font-size: ${token.fontSizeSM}px;
      color: ${token.colorTextTertiary} !important;
    `,
    metaInfo: css`
      display: flex;
      align-items: center;
      color: ${token.colorTextSecondary};
    `,
    sliced: css`
      color: ${token.colorTextQuaternary};
    `,
    title: css`
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;

      margin-block-end: 0;

      font-size: 16px;
      font-weight: bold;
    `,
    titleRow: css`
      color: ${token.colorText};
    `,

    url: css`
      color: ${token.colorTextTertiary};
    `,
  };
});

interface PageContentProps {
  messageId: string;
  result?: CrawlResult;
}

const SLICED_LIMITED = 5000;

const PageContent = memo<PageContentProps>(({ result }) => {
  const { t } = useTranslation('plugin');
  const { styles } = useStyles();
  const [display, setDisplay] = useState('render');

  if (!result) return undefined;

  const { url, title, description, content } = result.data;
  return (
    <Flexbox gap={24}>
      <Flexbox gap={8}>
        <Link href={url} onClick={(e) => e.stopPropagation()} target={'_blank'}>
          <Flexbox
            align={'center'}
            className={styles.titleRow}
            gap={24}
            horizontal
            justify={'space-between'}
          >
            <Flexbox>
              <div className={styles.title}>{title || result.originalUrl}</div>
            </Flexbox>
            <Center>
              <Icon icon={ExternalLink} />
            </Center>
          </Flexbox>
        </Link>
        {description && (
          <Typography.Paragraph
            className={styles.description}
            ellipsis={{ expandable: false, rows: 2 }}
          >
            {description}
          </Typography.Paragraph>
        )}
        <Flexbox align={'center'} className={styles.url} gap={4} horizontal>
          {result.data.siteName && <div>{result.data.siteName} · </div>}
          {result.originalUrl}
          <CopyButton content={result.originalUrl} size={'small'} />
        </Flexbox>

        <div className={styles.footer}>
          <Descriptions
            classNames={{
              content: styles.footerText,
            }}
            column={2}
            items={[
              {
                children: result.data.content?.length,
                label: t('search.crawPages.meta.words'),
              },
              {
                children: result.crawler,
                label: t('search.crawPages.meta.crawler'),
              },
            ]}
            size="small"
          />
        </div>
      </Flexbox>
      {content && (
        <Flexbox gap={12} paddingBlock={'0 12px'}>
          <Flexbox horizontal justify={'space-between'}>
            <Segmented
              onChange={(value) => setDisplay(value)}
              options={[
                { label: t('search.crawPages.detail.preview'), value: 'render' },
                { label: t('search.crawPages.detail.raw'), value: 'raw' },
              ]}
              value={display}
            />
            <CopyButton content={content} />
          </Flexbox>
          {display === 'render' ? (
            <Markdown variant={'chat'}>{content}</Markdown>
          ) : (
            <div style={{ paddingBlock: 12 }}>
              {content.length < SLICED_LIMITED ? (
                content
              ) : (
                <>
                  <span>{content.slice(0, SLICED_LIMITED)}</span>
                  <span className={styles.sliced}>{content.slice(SLICED_LIMITED, -1)}</span>
                </>
              )}
            </div>
          )}
          {content.length > SLICED_LIMITED && (
            <Alert message={t('search.crawPages.detail.tooLong')} variant={'pure'} />
          )}
        </Flexbox>
      )}
    </Flexbox>
  );
});

export default PageContent;
