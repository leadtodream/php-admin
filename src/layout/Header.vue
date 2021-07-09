<template>
  <header>
    <i class="fold" :class="isFoldAside?'el-icon-s-unfold':'el-icon-s-fold'" @click="toggleAside" />
		<el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(i,index) in breadcrumbs" :key="index">
        <span v-if="i.redirect==='noRedirect'||index===breadcrumbs.length-1" class="no-redirect">{{ i.meta.title }}</span>
        <router-link v-else :to="i.path" >{{ i.meta.title }}</router-link>
      </el-breadcrumb-item>
		</el-breadcrumb>
		<div class="right-menu">
      <el-dropdown class="avatar" trigger="click">
        <img :src="avatar" class="user-avatar">
        <i class="el-icon-caret-bottom" />
        <template #dropdown>
					<el-dropdown-menu>
						<router-link to="/profile">
							<el-dropdown-item>个人中心</el-dropdown-item>
						</router-link>
						<el-dropdown-item divided @click="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
export default {
	data() {
		return {
      breadcrumbs: [],
		}
	},
  computed: {
    avatar() {
      return this.$store.state.user.avatar
    },
    isFoldAside() {
      return this.$store.state.app.is_fold_aside
    },
  },
  watch: {
    $route(route) {
      // if you go to the redirect page, do not update the breadcrumbs
      if (route.path.startsWith('/redirect/')) {
        return
      }
      this.getBreadcrumbs()
    }
  },
  created() {
    this.getBreadcrumbs()
  },
  methods: {
    getBreadcrumbs() {
      const matched = [...this.$route.matched]
      const last = matched[matched.length - 1]
      const routes = this.$store.state.privilege.original_routes

      if (!matched.length) return

      if (last.meta.activeMenu) {
        for (const i of routes) {
          if (i.children) {
            for (const j of i.children) {
              if (j.path === last.meta.activeMenu) {
                matched.splice(1, 0, {
                  name: j.name,
                  path: j.path,
                  meta: { title: j.meta.title },
                })
                break
              }
            }
          }
        }
      }

      this.breadcrumbs = matched.filter(item => item.meta && item.meta.title)
    },
		toggleAside() {
      this.$store.dispatch('app/toggleAside')
		},
    logout() {
      this.$store.dispatch('user/signOut')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
}

.fold {
	padding: 15px;
	font-size: 20px;
	cursor: pointer;
  vertical-align: top;
}

.el-breadcrumb {
  display: inline-block;
  line-height: 50px;
  vertical-align: top;
}

.right-menu {
  float: right;
  margin-right: 20px;
  height: 100%;
  line-height: 50px;
}

.avatar {
  img {
    margin-right: 5px;
    width: 40px;
    height: 40px;
    cursor: pointer;
    vertical-align: middle;
  }
}
</style>
