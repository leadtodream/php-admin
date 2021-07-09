import ImageLibrary from './main.js'

export default {
  install(Vue) {
	Vue.prototype.$chooseImage = ImageLibrary
  },
}