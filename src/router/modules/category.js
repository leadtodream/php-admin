import Layout from '@/layout'

export default {
  path: '/category',
  name: 'Category',
  component: Layout,
  meta: { title: '类别', icon: 'tree' },
  redirect: 'noRedirect',
  children: [
    {
      path: '/categories',
      name: 'Categories',
      component: () => import('@/views/category/Index'),
      meta: { title: '类别管理' },
    },
  ],
}
