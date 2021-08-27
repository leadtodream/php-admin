<template>
  <aside>
    <section class="aside-head">
      <img :src="logo">
      <h1>{{ title }}</h1>
    </section>
    <el-scrollbar class="aside-body">
      <el-menu
        active-text-color="#1890ff"
        background-color="#304156"
        class="aside-menu"
        text-color="#bfcbd9"
        :collapse="isFoldAside"
        :collapse-transition="false"
        :default-active="activeMenu"
        :unique-opened="true"
        @select="selectMenu" 
      >
        <template v-for="i in menus">
          <el-sub-menu v-if="i.children.length > 1" :key="i.path" :index="i.path">
            <template #title>
              <SvgIcon :name="i.meta.icon" />
              <span>{{ i.meta && i.meta.title }}</span>
            </template>
            <el-menu-item v-for="j in i.children" :key="j.path" :index="j.path">
              <template #title>{{ j.meta.title }}</template>
            </el-menu-item>
          </el-sub-menu>
          <el-menu-item v-else-if="i.children.length" :key="i.children[0].path" :index="i.children[0].path">
            <SvgIcon :name="i.meta.icon" />
            <template #title>
              <span>{{ i.meta.title }}</span>
            </template>
          </el-menu-item>
        </template>
      </el-menu>
    </el-scrollbar>
  </aside>
</template>

<script>
import SvgIcon from '@/components/SvgIcon'
import { title, logo } from '@/settings'

export default {
  name: 'Aside',
  components: { SvgIcon },
  data() {
    return {
      logo,
      title,
    }
  },
  computed: {
    menus() {
      const list = this.$store.getters.myRoutes.filter(i => !i.hidden)
      list.forEach(i => {
        if (i.children) {
          i.children = i.children.filter(j => !j.hidden)
        }
      })

      return list
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    isFoldAside() {
      return this.$store.state.app.is_fold_aside
    },
  },
  created() {
    // console.log(JSON.parse(JSON.stringify(this.menus)))
  },
  methods: {
    selectMenu(e) {
      this.$router.push(e)
    },
  },
}
</script>

<style lang="scss" scoped>
aside {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  width: 210px;
  background-color: #304156;
  overflow: hidden;
  transition: width 0.25s;
}
.fold aside {width: 64px;}

.aside-head {
  display: flex;
  align-items: center;
  padding: 0 20px;
  height: 50px;
  background: #2b2f3a;

  img {
    margin-left: 0;
    width: 32px;
    height: 32px;
    object-fit: cover;
    transition: margin .25s;
  }
}

h1 {
  display: inline;
  font-size: 14px;
  margin-left: 1em;
  color: white;
  opacity: 1;
  transition-property: opacity;
  transition-delay: .25s;
}
.fold h1 {opacity: 0;visibility: hidden;}

.hideSidebar .aside-head {
  img {margin-left: -11px;}
  h1 {display: none;}
}

.aside-body {
  height: calc(100% - 50px);
  overflow-x: hidden;
}
.aside-menu:not(.el-menu--collapse) {
  width: 210px;
}

.svg-icon {
  margin-right: 15px;
  width: 15px;
  height: 15px;
  color: inherit;
}

.el-menu--inline .el-menu-item {background: rgb(38, 52, 69)!important;}
.el-menu--inline .el-menu-item:hover {background: #001528!important}
</style>