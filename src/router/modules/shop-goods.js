import Layout from '@/layout'

export default {
  path: '/shops/good',
  name: 'ShopGoods',
  component: Layout,
  meta: { title: '商品管理', icon: 'goods' },
  redirect: 'noRedirect',
  children: [
    {
      path: '/shops/goods',
      name: 'ShopGoodsList',
      component: () => import('@/views/shop-goods/List'),
      meta: { title: '商品列表' },
      children: [
        {
          path: '/shops/goods/:id(\\d+)',
          name: 'ShopGoodsDetail',
          component: () => import('@/views/shop-goods/Detail'),
          meta: { title: '商品详情', activeMenu: '/shops/goods' },
          hidden: true,
        },
        {
          path: '/shops/goods/add',
          name: 'ShopGoodsAdd',
          component: () => import('@/views/shop-goods/Form'),
          meta: { title: '添加', activeMenu: '/shops/goods' },
          hidden: true,
        },
        {
          path: '/shops/goods/:id(\\d+)/edit',
          name: 'ShopGoodsEdit',
          component: () => import('@/views/shop-goods/Form'),
          meta: { title: '编辑', activeMenu: '/shops/goods' },
          hidden: true,
        },
      ],
    },
  ],
}
