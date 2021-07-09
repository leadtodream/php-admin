import Layout from '@/layout'

export default {
  path: '/coupon',
  name: 'Coupon',
  component: Layout,
  meta: { title: '优惠券', icon: 'coupon' },
  redirect: 'noRedirect',
  children: [
    {
      path: '/coupons',
      name: 'CouponList',
      component: () => import('@/views/coupon/List'),
      meta: { title: '优惠券列表' },
      children: [
        {
          path: '/coupons/add',
          name: 'CouponAdd',
          component: () => import('@/views/coupon/Form'),
          meta: { title: '添加', activeMenu: '/coupons' },
          hidden: true,
        },
        {
          path: '/coupons/:id(\\d+)/edit',
          name: 'CouponEdit',
          component: () => import('@/views/coupon/Form'),
          meta: { title: '编辑', activeMenu: '/coupons' },
          hidden: true,
        },
      ],
    },
    {
      path: '/coupons/issued',
      name: 'CouponIssued',
      component: () => import('@/views/coupon/Issued'),
      meta: { title: '发放记录' },
    },
  ],
}
