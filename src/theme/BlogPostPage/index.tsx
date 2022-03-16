/**
 * @BlogPostPage - 自定义文章内容页面
 *
 * 笔记：
 * @Props 属性
 *
 * @content - 文章 markdown 内容（包含文章信息数据 metadata，文章目录 toc 等）
 * @sidebar - 博客侧边栏
 * @...
 */

import React from 'react';

import type { Props } from '@theme/BlogPostPage';
import Seo from '@theme/Seo'; // 搜索引擎组件（须放到文章内容中）
import BlogLayout from '@theme/BlogLayout';
import BlogPostPaginator from '@theme/BlogPostPaginator'; // 内容分页器
import BlogPostAuthors from '@theme/BlogPostAuthors'; // 作者信息组件
import BackToTopButton from '@theme/BackToTopButton'; // 平滑滚动到顶部组件
import MDXComponents from '@theme/MDXComponents'; // markdown 摘要内容
import { MDXProvider } from '@mdx-js/react'; // markdown 组件
import { ThemeClassNames } from '@docusaurus/theme-common';
import { useBaseUrlUtils } from '@docusaurus/useBaseUrl';
import TOC from '@theme/TOC'; // 右侧目录

import clsx from 'clsx';
import { Divider } from '@arco-design/web-react';

import BlogCreationDate from '@site/src/components/BlogCreationDate';
import BlogTagsList from '@site/src/components/BlogTagsList';
import styles from './styles.module.scss';

const BlogPostPage = (props: Props): JSX.Element => {
  // console.log('BlogPostPage -- Props: ', props);

  const { content: BlogPostContents, sidebar } = props;
  const { frontMatter, assets, metadata } = BlogPostContents;
  const { title, description, nextItem, prevItem, date, readingTime, tags, authors } = metadata;
  const {
    hide_table_of_contents: hideTableOfContents,
    keywords,
    toc_min_heading_level: tocMinHeadingLevel,
    toc_max_heading_level: tocMaxHeadingLevel,
  } = frontMatter; // 一些用于 seo 的属性

  const image = assets.image ?? frontMatter.image; // 文章图片/封面

  const { withBaseUrl } = useBaseUrlUtils();

  return (
    <BlogLayout
      wrapperClassName={ThemeClassNames.wrapper.blogPages}
      pageClassName={ThemeClassNames.page.blogPostPage}
      sidebar={sidebar}
      toc={
        !hideTableOfContents && BlogPostContents.toc && BlogPostContents.toc.length > 0 ? (
          <TOC
            toc={BlogPostContents.toc}
            minHeadingLevel={tocMinHeadingLevel}
            maxHeadingLevel={tocMaxHeadingLevel}
          />
        ) : undefined
      }
    >
      {/* Seo 组件 - 优化搜索引擎 */}
      <Seo title={title} description={description} keywords={keywords} image={image}>
        <meta property='og:type' content='article' />
        <meta property='article:published_time' content={date} />

        {authors.some((author) => author.url) && (
          <meta
            property='article:author'
            content={authors
              .map((author) => author.url)
              .filter(Boolean)
              .join(',')}
          />
        )}
        {tags.length > 0 && (
          <meta property='article:tag' content={tags.map((tag) => tag.label).join(',')} />
        )}
      </Seo>

      <BackToTopButton />

      {/* 文章内容 */}
      <article
        className='mb-xl'
        itemProp='blogPost（博客内容）'
        itemScope
        itemType='http://schema.org/BlogPosting'
      >
        <header>
          <h1 itemProp='headline（大字标题）'>{title}</h1>
          <BlogCreationDate
            className='my-6'
            date={date}
            formattedDate='YYYY-MM-DD'
            readingTime={readingTime}
          />
          <div className='mb-4'>
            <BlogPostAuthors authors={authors} assets={assets} />
          </div>
        </header>

        {image && <meta itemProp='image' content={withBaseUrl(image, { absolute: true })} />}

        <div className='markdown' itemProp='articleBody（文章内容）'>
          <MDXProvider components={MDXComponents}>
            <BlogPostContents />
          </MDXProvider>
        </div>

        <footer className='mt-18'>
          <BlogTagsList tags={tags} />
          <Divider className='arco-divider-dashed' />
          {/* <Divider className='arco-divider-dashed' /> */}
        </footer>
      </article>

      {(nextItem || prevItem) && <BlogPostPaginator nextItem={nextItem} prevItem={prevItem} />}
    </BlogLayout>
  );
};

export default BlogPostPage;
