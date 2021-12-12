/**
 * 私有路由
 */
import article from './modules/article'
import category from './modules/category'
import coupon from './modules/coupon'
import goods from './modules/goods'
import goodsOrder from './modules/goods-order'
import log from './modules/log'
import setting from './modules/setting'
// import shop from './modules/shop'
// import shopGoods from './modules/shop-goods'
// import shopOrder from './modules/shop-order'
import site from './modules/site'
import user from './modules/user'
import withdraw from './modules/withdraw'

export default [
  article,
  user,
  goods,
  goodsOrder,
  // shop,
  // shopGoods,
  // shopOrder,
  coupon,
  withdraw,
  category,
  site,
  setting,
  log,
]
