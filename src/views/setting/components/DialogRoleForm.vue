<template>
  <div>
    <el-dialog title="角色信息" v-model="is_show">
      <el-form label-width="4em">
        <el-form-item label="名称" required>
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="简介">
          <el-input v-model="form.intro" />
        </el-form-item>
        <el-form-item label="权限">
          <el-tree
            ref="tree"
            show-checkbox
            node-key="name"
            :accordion="true"
            :data="list_privilege"
            :default-checked-keys="[]"
            :props="{children: 'children',label: 'title'}"
          >
            <template #default="{ data }">
              <span class="custom-tree-node">{{ data.meta.title }}</span>
            </template>
          </el-tree>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="is_show = false">取消</el-button>
        <el-button type="primary" @click="submit">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import ajax from '@/assets/ajax'

export default {
  name: 'DialogRoleForm',
  data() {
    return {
      id: 0,
      form: {
        name: '',
        intro: '',
        privileges: [],
      },
      list_privilege: [],
      list_privilege_node: [],
      is_show: false,
    }
  },
  props: ['api'],
  created() {
    this.list_privilege = [...this.$store.state.privilege.original_routes]
    this.filterPrivilegeNode(this.list_privilege)
  },
  methods: {
    // 筛选权限结点
    filterPrivilegeNode(list) {
      list.forEach(i => {
        if (i.children) {
          this.list_privilege_node.push(i.name)
          this.filterPrivilegeNode(i.children)
        }
      })
    },
    // 设置选中的权限
    setCheckedPrivileges() {
      const ref = this.$refs.tree
      if (!ref) {
        return setTimeout(() => this.setCheckedPrivileges(), 50)
      }

      const keys = this.form.privileges.filter(i => !this.list_privilege_node.includes(i))
      ref.setCheckedKeys(keys)
    },
    // 显示对话框
    show(info) {
      if (info) {
        this.id = info.id
        this.form.name = info.name
        this.form.intro = info.intro
        this.form.privileges.splice(0, this.form.privileges.length, ...info.privileges)
      } else {
        this.id = 0
        this.form.name = ''
        this.form.intro = ''
        this.form.privileges.splice(0)
      }

      this.is_show = true
      this.setCheckedPrivileges()
    },
    // 保存信息
    submit() {
      const data = this.form
      let url = this.api
      let method = 'post'
      if (this.id) {
        method = 'put'
        url = `${url}/${this.id}`
      }

      // 提取权限名称
      const checked_nodes = this.$refs.tree.getCheckedKeys()
      const half_checked_nodes = this.$refs.tree.getHalfCheckedKeys()
      data.privileges = [...checked_nodes, ...half_checked_nodes]

      ajax({ method, url, data })
        .then(() => {
          this.$message.success('保存成功')
          this.is_show = false
          this.$emit('changed')
        })
    },
  },
}
</script>
