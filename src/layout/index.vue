<template>
  <div :class="{fold:isFoldAside}">
    <Aside />
    <div class="header-container">
      <Header />
      <Nav />
    </div>
    <div class="main-container">
      <main>
        <router-view  v-slot="{ Component, route }">
          <transition name="fade" mode="out-in">
            <keep-alive :include="cachedViews">
              <component :is="Component" :key="route.path" />
            </keep-alive>
          </transition>
        </router-view>
      </main>
    </div>
  </div>
</template>

<script>
import Aside from './Aside.vue'
import Header from './Header.vue'
import Nav from './Nav.vue'

export default {
  name: 'Home',
  components: {
    Aside,
    Header,
    Nav,
  },
  computed: {
    cachedViews() {
      const list = this.$store.state.tagsView.cachedViews
      return [...list]
    },
    isFoldAside() {
      return this.$store.state.app.is_fold_aside
    },
  },
}
</script>

<style lang="scss" scoped>
.header-container {
  position: fixed;
  z-index: 3;
  top: 0;
  left: 210px;
  right: 0;
}

.main-container {
  margin-left: 210px;
  padding-top: 86px;
}

// 折叠侧边栏
.fold {
  .header-container {left: 64px;}
  .main-container {margin-left: 64px;}
}

// 进入过渡 & 离开过渡
.fade-enter-active,
.fade-leave-active {
  transition: all 0.28s;
}
.fade-enter-from,
.fade-leave-active {
  opacity: 0;
  transform: translateX(30px);
}
</style>