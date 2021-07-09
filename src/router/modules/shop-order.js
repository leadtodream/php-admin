import Layout from '@/layout'

export default {
  path: '/shops/order',
  name: 'ShopOrder',
  component: Layout,
  meta: { title: '订单管理', icon: 'order' },
  redirect: 'noRedirect',
  children: [
    {
      path: '/shops/orders',
      name: 'ShopOrderList',
      component: () => import('@/views/shop-order/List'),
      meta: { title: '订单列表' },
      children: [
        {
          path: '/shops/orders/:id(\\d+)',
          name: 'ShopOrderDetail',
          component: () => import('@/views/shop-order/Detail'),
          meta: { title: '订单详情', activeMenu: '/shops/orders' },
          hidden: true,
        },
      ],
    },
    {
      path: '/shops/orders/refunds',
      name: 'ShopOrderRefundList',
      component: () => import('@/views/shop-order/RefundList'),
      meta: { title: '售后处理' },
      children: [
        {
          path: '/shops/orders/refunds/:id(\\d+)',
          name: 'ShopOrderRefundDetail',
          component: () => import('@/views/shop-order/RefundDetail'),
          meta: { title: '售后详情', activeMenu: '/shops/orders/refunds' },
          hidden: true,
        },
      ],
    },
  ],
}
