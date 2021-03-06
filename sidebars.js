/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // study: [{ type: 'autogenerated', dirName: 'study' }],
  columns: [
    // 'introduction',
    'npm-plugin',
    {
      type: 'category',
      label: 'Docusaurus 专栏',
      link: {
        type: 'generated-index',
        title: 'Docusaurus 专栏',
        description: '学习 Docusaurus 相关的知识, 包括文档, 博客, 配置等! 🐣',
        slug: '/column-docusaurus/guides',
      },
      // collapsed: false,
      items: [{ type: 'autogenerated', dirName: 'column-docusaurus' }],
    },
    {
      type: 'category',
      label: 'JS & TS 专栏',
      items: [{ type: 'autogenerated', dirName: 'column-js' }],
    },
    {
      type: 'category',
      label: 'React 专栏',
      items: [{ type: 'autogenerated', dirName: 'column-react' }],
    },
    {
      type: 'category',
      label: 'CSS 专栏',
      items: [{ type: 'autogenerated', dirName: 'column-css' }],
    },
    {
      type: 'category',
      label: '浏览器 & 服务端 专栏',
      items: [
        'column-service/http',
        'column-service/authentication',
        'column-service/web-storage',
        {
          type: 'category',
          label: '前端项目部署 📦',
          link: {
            type: 'generated-index', // 介绍索引页面
            description: '学习 如何部署前端项目，及 Linux 系统和 宝塔面板 的简单使用',
            slug: '/column-service/guides',
          },
          items: [{ type: 'autogenerated', dirName: 'column-service/deploy' }],
        },
        'column-service/nodejs-introduction',
        // 'column-service/nestjs-introduction',
        'column-service/nginx-config',
      ],
    },
    // { type: 'link', label: '百度一下', href: 'https://www.baidu.com/' },
  ],
};

module.exports = sidebars;
