import Layout from '@/layout'

export default {
  path: '/book',
  name: 'Book',
  component: Layout,
  meta: { title: '书籍', icon: 'book' },
  redirect: 'noRedirect',
  children: [
    {
      path: '/books',
      name: 'BookList',
      component: () => import('@/views/book/List'),
      meta: { title: '书籍列表' },
      children: [
        {
          path: '/books/add',
          name: 'BookAdd',
          component: () => import('@/views/book/Form'),
          meta: { title: '添加' },
          hidden: true,
        },
        {
          path: '/books/:id(\\d+)',
          name: 'BookDetail',
          component: () => import('@/views/book/Form'),
          meta: { title: '详情' },
          hidden: true,
        },
        {
          path: '/books/:id(\\d+)/edit',
          name: 'BookEdit',
          component: () => import('@/views/book/Form'),
          meta: { title: '编辑' },
          hidden: true,
        },
      ],
    },
  ],
}
