import Layout from '@/layout'

export default {
  path: '/site',
  name: 'Site',
  component: Layout,
  meta: { title: '站点管理', icon: 'site' },
  redirect: 'noRedirect',
  children: [
    {
      path: '/site/slides',
      name: 'Slide',
      component: () => import('@/views/site/Slide'),
      meta: { title: '轮播图' },
    },
    {
      path: '/site/banners',
      name: 'Banner',
      component: () => import('@/views/site/Banner'),
      meta: { title: '横幅广告' },
    },
    {
      path: '/site/notices',
      name: 'Notice',
      component: () => import('@/views/site/notice/List'),
      meta: { title: '公告通知' },
      children: [
        {
          path: '/site/notices/add',
          name: 'NoticeAdd',
          component: () => import('@/views/site/notice/Form'),
          meta: { title: '添加', activeMenu: '/site/notices' },
          hidden: true,
        },
        {
          path: '/site/notices/:id(\\d+)/edit',
          name: 'NoticeEdit',
          component: () => import('@/views/site/notice/Form'),
          meta: { title: '编辑', activeMenu: '/site/notices' },
          hidden: true,
        },
      ],
    },
    {
      path: '/site/faqs',
      name: 'Faq',
      component: () => import('@/views/site/faq/List'),
      meta: { title: '常见问题' },
      children: [
        {
          path: '/site/faqs/add',
          name: 'FaqAdd',
          component: () => import('@/views/site/faq/Form'),
          meta: { title: '添加', activeMenu: '/site/faqs' },
          hidden: true,
        },
        {
          path: '/site/faqs/:id(\\d+)/edit',
          name: 'FaqEdit',
          component: () => import('@/views/site/faq/Form'),
          meta: { title: '编辑', activeMenu: '/site/faqs' },
          hidden: true,
        },
      ],
    },
    {
      path: '/site/agreements',
      name: 'Agreement',
      component: () => import('@/views/site/agreement/List'),
      meta: { title: '服务协议' },
      children: [
        {
          path: '/site/agreements/add',
          name: 'AgreementAdd',
          component: () => import('@/views/site/agreement/Form'),
          meta: { title: '添加', activeMenu: '/site/agreements' },
          hidden: true,
        },
        {
          path: '/site/agreements/:id(\\d+)/edit',
          name: 'AgreementEdit',
          component: () => import('@/views/site/agreement/Form'),
          meta: { title: '编辑', activeMenu: '/site/agreements' },
          hidden: true,
        },
      ],
    },
  ],
}
