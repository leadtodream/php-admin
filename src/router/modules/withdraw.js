import Layout from '@/layout'

export default {
  path: '/withdraw',
  name: 'Withdraw',
  component: Layout,
  meta: { title: '提现', icon: 'withdraw' },
  redirect: 'noRedirect',
  children: [
    {
      path: '/withdraw/user',
      name: 'WithdrawUser',
      component: () => import('@/views/withdraw/User'),
      meta: { title: '用户提现' },
    },
    {
      path: '/withdraw/shop',
      name: 'WithdrawShop',
      component: () => import('@/views/withdraw/Shop'),
      meta: { title: '商家提现' },
    },
  ],
}
