<template>
  <section>
    <el-tabs v-model="module">
      <el-tab-pane label="文章" name="article" />
      <el-tab-pane label="商家" name="shop" />
      <el-tab-pane label="商品" name="shop_goods" />
    </el-tabs>
    <el-header class="filter-bar" height="auto">
      <el-input v-model="keyword" placeholder="输入关键字进行过滤" clearable />
      <el-button type="primary" @click="add(0)">添加类目</el-button>
    </el-header>
    <!-- 树形结构数据 -->
    <el-tree
      class="tree"
      ref="tree"
      draggable
      node-key="id"
      :data="list"
      :indent="45"
      :allow-drop="() => true"
      :allow-drag="() => true"
      :accordion="true"
      :default-expand-all="false"
      :filter-node-method="filterTree"
      @node-drop="saveSort"
    >
      <template #default="{ node, data }">
        <span class="custom-tree-node">
          <img :src="data.img">
          <span>{{ data.name }}</span>
          <span class="options">
            <el-button class="color-primary" type="text" :data-id="node" @click.stop="add(data.id)">添加子集</el-button>
            <el-button class="color-warning" type="text" @click.stop="edit(data)">编辑</el-button>
            <el-button class="color-danger" type="text" @click.stop="del(data.id)">删除</el-button>
          </span>
        </span>
      </template>
    </el-tree>
    <!-- 弹窗 -->
    <DialogCategoryForm ref="dialogCategoryForm" :api="api" @changed="getList" />
  </section>
</template>

<script>
import DialogCategoryForm from './components/DialogCategoryForm'
import ajax from '@/assets/ajax'

export default {
  name: 'Categories',
  components: { DialogCategoryForm },
  data() {
    return {
      module: 'article',
      keyword: '',
      list: [],
    }
  },
  computed: {
    api() {
      return `/admin/categories/${this.module}`
    },
  },
  created() {
    this.getList()
  },
  watch: {
    keyword(value) {
      this.$refs['tree'].filter(value)
    },
    module() {
      this.list = []
      this.getList()
    },
  },
  methods: {
    add(parent_id) {
      this.$refs['dialogCategoryForm'].show(parent_id)
    },
    edit(item) {
      this.$refs['dialogCategoryForm'].show(item)
    },
    del(id) {
      ajax.delete(`${this.api}/${id}`)
        .then(() => {
          this.$message.success('删除成功')
          this.getList()
        })
    },
    filterTree(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    getList() {
      ajax.get(this.api)
        .then(res => {
          this.list = res
        })
        .catch(() => 1)
    },
    // 保存排序
    saveSort() {
      const list = []
      this.formatTree(list, this.list)

      ajax.patch(`${this.api}/sort`, list)
        .then(() => {
          this.$message.success('调整排序成功')
        })
    },
    // 格式化树形结构
    formatTree(list, items, parent_id = 0) {
      const length = items.length

      items.forEach((i, index) => {
        list.push({
          parent_id,
          id: i.id,
          sort: length - index,
        })

        if (i.children && i.children.length) {
          this.formatTree(list, i.children, i.id)
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep(.tree) {
  margin-top: 20px;

  .el-tree-node__content > .el-tree-node__expand-icon {
    padding: 0;
    width: 20px;
    height: 40px;
    line-height: 40px;
    text-align: center;
  }
  .el-tree-node.is-drop-inner > .el-tree-node__content {
    background: #D9E2F0;
  }
  .el-tree-node__content {
    height: auto;
    padding: 5px 10px;
    box-sizing: unset;
    border-bottom: 10px solid white;
    background: #f9f9f9;
    cursor: move;
  }
  .el-tree-node__content:hover {
    background: #ececec;
  }
  .el-tree-node__content img {
    width: 40px;
    height: 40px;
    margin-right: 10px;
    vertical-align: middle;
  }
  .options {
    margin-left: 30px;
    opacity: 0;
  }
  .el-tree-node__content:hover .options {
    opacity: 1;
  }
}

// 筛选条
.filter-bar {
  display: flex;
  justify-content: space-between;

  .el-input {
    width: 80%;
  }
}
</style>
