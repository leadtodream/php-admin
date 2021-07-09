import Vue from 'vue'
import Main from './main.vue'

const Constructor = Vue.extend(Main)

let instance

const ImageLibrary = function(options) {
  instance = new Constructor
  instance.$mount()
  instance.callback = options.success
  instance.is_show = true
  document.body.appendChild(instance.$el)

  return instance
}

export default ImageLibrary
