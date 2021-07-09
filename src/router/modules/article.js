import Layout from '@/layout'

const article = {
  path: '/article',
  name: 'Article',
  component: Layout,
  meta: { title: '文章', icon: 'article' },
  redirect: 'noRedirect',
  children: [
    {
      path: '/articles',
      name: 'ArticleList',
      component: () => import('@/views/article/List'),
      meta: { title: '文章列表' },
      children: [
        {
          path: '/articles/add',
          name: 'ArticleAdd',
          component: () => import('@/views/article/Form'),
          meta: { title: '添加', activeMenu: '/articles' },
          hidden: true,
        },
        {
          path: '/articles/:id(\\d+)/edit',
          name: 'ArticleEdit',
          component: () => import('@/views/article/Form'),
          meta: { title: '编辑', activeMenu: '/articles' },
          hidden: true,
        },
        {
          path: '/articles/:id(\\d+)',
          name: 'ArticleDetail',
          component: () => import('@/views/article/Detail'),
          meta: { title: '详情', activeMenu: '/articles' },
          hidden: true,
        },
      ],
    },
  ],
}

export default article
