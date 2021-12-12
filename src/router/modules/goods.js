import Layout from '@/layout'

export default {
  path: '/good',
  name: 'Goods',
  component: Layout,
  meta: { title: '商品', icon: 'goods' },
  redirect: 'noRedirect',
  children: [
    {
      path: '/goods',
      name: 'GoodsList',
      component: () => import('@/views/goods/List'),
      meta: { title: '商品列表' },
      children: [
        {
          path: '/goods/add',
          name: 'GoodsAdd',
          component: () => import('@/views/goods/Form'),
          meta: { title: '添加', activeMenu: '/goods' },
          hidden: true,
        },
        {
          path: '/goods/:id(\\d+)/edit',
          name: 'GoodsEdit',
          component: () => import('@/views/goods/Form'),
          meta: { title: '编辑', activeMenu: '/goods' },
          hidden: true,
        },
      ],
    },
    {
      path: '/freights',
      name: 'FreightList',
      component: () => import('@/views/goods/FreightList'),
      meta: { title: '运费模板' },
      children: [
        {
          path: '/freights/add',
          name: 'FreightAdd',
          component: () => import('@/views/goods/FreightForm'),
          meta: { title: '添加', activeMenu: '/freights' },
          hidden: true,
        },
        {
          path: '/freights/:id(\\d+)/edit',
          name: 'FreightEdit',
          component: () => import('@/views/goods/FreightForm'),
          meta: { title: '编辑', activeMenu: '/freights' },
          hidden: true,
        },
      ],
    },
  ],
}
