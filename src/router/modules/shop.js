import Layout from '@/layout'

export default {
  path: '/shop',
  name: 'Shop',
  component: Layout,
  meta: { title: '商家', icon: 'shop' },
  redirect: 'noRedirect',
  children: [
    {
      path: '/shops',
      name: 'ShopList',
      component: () => import('@/views/shop/List'),
      meta: { title: '商家列表' },
      children: [
        {
          path: '/shops/:id(\\d+)',
          name: 'ShopDetail',
          component: () => import('@/views/shop/Detail'),
          meta: { title: '商家详情', activeMenu: '/shops' },
          hidden: true,
        },
        {
          path: 'EditShopMoney',
          name: 'EditShopMoney',
          meta: { title: '充值余额' },
          hidden: true,
        },
      ],
    },
    {
      path: '/shops/money',
      name: 'ShopMoney',
      component: () => import('@/views/shop/Money'),
      meta: { title: '余额明细' },
    },
    {
      path: '/shops/points',
      name: 'ShopPoint',
      component: () => import('@/views/shop/Point'),
      meta: { title: '积分明细' },
    },
    {
      path: '/shops/apply',
      name: 'ShopListApply',
      component: () => import('@/views/shop/ListApply'),
      meta: { title: '待审核' },
    },
  ],
}
