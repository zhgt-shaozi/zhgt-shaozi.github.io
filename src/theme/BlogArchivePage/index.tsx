/**
 * @description 博客空间档案
 */

/**
 * @description - 博客内容
 *
 * 笔记：
 *  * @Typescript 笔记：
 *
 * React.FC - FC 是 FunctionComponent 的简写，该类型定义了一些默认属性，如 children 等
 * defaultProps - 对 props 进行解构，在解构对象中对 props 的属性设置默认值
 *
 * [T, T1][number] - 索引类型，将该数组中的值解构合并成 联合类型
 *
 * @<article> 标签：语义化标签，定义独立的文本内容，主要用于博客文章，新闻故事，帖子等，有利于 SEO
 * @<strong> 标签：语义化标签，字体加粗，强调内容，比 <b> 标签更利于 SEO 检索
 * @<time> 标签：语义化标签，定义日期或时间，@datetime 是其属性，定义其日期时间
 * @itemProp 属性：语义化属性，描述标签的功能，用于 seo 优化搜索引擎
 * @itemScope 属性：语义化属性，是一个 bool 类型，定义了一个与元数据关联的数据项，用于 seo 优化搜索引擎
 * @itemType 属性：语义化属性，通常表示一个地址，用于 seo 优化搜索引擎
 *
 *
 * @Props 属性
 *
 * @children - 文章 markdown 内容（与源码不同，仅来自于 BlogListPage 组件）
 * @metadata - 文章信息数据（作者，链接，标签等）
 * @truncated - 文章是否有摘要
 * @assets - 静态文件（作者图片，封面等）
 * @frontMatter - 文章抬头信息（作者信息，头像地址等）
 * @isBlogPostPage - 是否为文章内容页面，boolean 类型，默认为 false（源码中额外传递的属性）
 * @... 其他自定义属性
 *
 *
 * @metadata 属性
 *
 * @date - 文章创建时间
 * @formattedDate - 文章格式化时间
 * @permalink - 文章链接地址
 * @tags - 文章标签
 * @title - 文章标题
 * @readingTime - 文章预计阅读时间
 * @authors - 文章作者信息
 * @editUrl - 文章编辑地址
 * @nextItem - 下一篇文章信息（路由，名称等）
 * @prevItem - 上一篇文章信息（路由，名称等）
 * @...
 */

// import { tuple } from '@site/src/utils/type';

// 随机 lottie 的方向
// enum DirectionTypes {
//   left,
//   right,
// }
// type DirectionType = keyof typeof DirectionTypes;
// 或
// const DirectionTypes = tuple('left', 'right');
// type DirectionType = typeof DirectionTypes[number];

// <Link to='/blog/archive' className='absolute top-1/2 left-0 -translate-y-1/2'>
// 博客时光馆
// </Link>

// TODO 计划更改该页面的样式

import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import type { ArchiveBlogPost, Props } from '@theme/BlogArchivePage';
import { translate } from '@docusaurus/Translate';
import { PageMetadata } from '@docusaurus/theme-common';

type YearProp = {
  year: string;
  posts: ArchiveBlogPost[];
};

function Year({ year, posts }: YearProp) {
  return (
    <>
      <h3>{year}</h3>
      <ul>
        {posts.map((post) => (
          <li key={post.metadata.date}>
            <Link to={post.metadata.permalink}>
              {post.metadata.formattedDate} - {post.metadata.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

function YearsSection({ years }: { years: YearProp[] }) {
  return (
    <section className='margin-vert--lg'>
      <div className='container'>
        <div className='row'>
          {years.map((_props, idx) => (
            <div key={idx} className='col col--4 margin-vert--lg'>
              <Year {..._props} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function listPostsByYears(blogPosts: readonly ArchiveBlogPost[]): YearProp[] {
  const postsByYear = blogPosts.reduceRight((posts, post) => {
    const year = post.metadata.date.split('-')[0]!;
    const yearPosts = posts.get(year) ?? [];
    return posts.set(year, [post, ...yearPosts]);
  }, new Map<string, ArchiveBlogPost[]>());

  return Array.from(postsByYear, ([year, posts]) => ({
    year,
    posts,
  }));
}

export default function BlogArchive({ archive }: Props): JSX.Element {
  const title = translate({
    id: 'theme.blog.archive.title',
    message: 'Archive',
    description: 'The page & hero title of the blog archive page',
  });
  const description = translate({
    id: 'theme.blog.archive.description',
    message: 'Archive',
    description: 'The page & hero description of the blog archive page',
  });
  const years = listPostsByYears(archive.blogPosts);
  return (
    <>
      {/* 添加额外的 meta 标签 */}
      <PageMetadata title={title} description={description} />
      <Layout>
        <header className='hero hero--primary'>
          <div className='container'>
            <h1 className='hero__title'>{title}</h1>
            <p className='hero__subtitle'>{description}</p>
          </div>
        </header>
        <main>{years.length > 0 && <YearsSection years={years} />}</main>
      </Layout>
    </>
  );
}
