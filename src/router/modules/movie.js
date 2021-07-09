import Layout from '@/layout'

export default {
  path: '/movie',
  name: 'Movie',
  component: Layout,
  meta: { title: '电影', icon: 'movie' },
  redirect: 'noRedirect',
  children: [
    {
      path: '/movies',
      name: 'MovieList',
      component: () => import('@/views/movie/List'),
      meta: { title: '电影列表' },
      children: [
        {
          path: '/movies/add',
          name: 'MovieCreate',
          component: () => import('@/views/movie/Form'),
          meta: { title: '添加', activeMenu: '/movies' },
          hidden: true,
        },
        {
          path: '/movies/:id/edit',
          name: 'MovieEdit',
          component: () => import('@/views/movie/Form'),
          meta: { title: '编辑', activeMenu: '/movies' },
          hidden: true,
        },
      ],
    },
  ],
}
