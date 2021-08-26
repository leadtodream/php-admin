<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script>
import admin from './admin'
import guest from './guest'

export default {
  name: 'Dashboard',
  components: { admin, guest },
  computed: {
    currentRole() {
      return this.$store.state.user.privileges.length ? 'admin' : 'guest'
    },
  },
}
</script>
