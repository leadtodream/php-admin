<template>
  <section>
    <!-- 表格-头部 -->
    <div class="table-header">
      <el-input v-model="list_query.keyword" placeholder="关键字" />
      <SelectQueryUser v-model="list_query.user_id" />
      <el-button plain type="primary" icon="el-icon-search" @click="listSearch">搜索</el-button>
      <el-button plain icon="el-icon-circle-close" @click="listReset">重置</el-button>
    </div>
    <!-- 表格-内容 -->
    <el-table
      ref="table"
      v-loading="is_loading"
      :data="list"
      @filter-change="listFilter"
      @selection-change="listSelect"
    >
      <el-table-column type="selection" width="50" />
      <el-table-column label="用户" width="200">
        <template #default="scope">
          <el-avatar :src="scope.row.user.img" />{{ scope.row.user.nickname }}
        </template>
      </el-table-column>
      <el-table-column label="模块" prop="model_str" width="150" column-key="model" :filters="filter_model" :filter-multiple="false" />
      <el-table-column label="模块ID" prop="model_id" width="100" />
      <el-table-column label="内容" prop="content" />
      <el-table-column label="图片">
        <template #default="scope">
          <el-image v-for="i in scope.row.imgs" :key="i" :src="i" :preview-src-list="scope.row.imgs" />
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="created_at" width="160" />
      <el-table-column label="操作" align="center" width="160" class-name="table-column-action">
        <template #default="scope">
          <el-button v-if="!scope.row.state" plain type="info" size="mini" icon="el-icon-s-flag" title="标记" @click="patchState(scope.row.id)" />
          <el-button plain type="danger" size="mini" icon="el-icon-delete" @click="delRow(scope.row.id)" />
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格-底部 -->
    <div v-show="list.length" class="table-footer">
      <el-button type="danger" size="small" plain @click="delRows">批量删除</el-button>
    </div>
    <pagination v-model:page="list_query.page" v-model:size="list_query.size" :total="total" @changed="getList" />
  </section>
</template>

<script>
import Pagination from '@/components/Pagination'
import SelectQueryUser from '@/components/SelectQuery/User'
import ajax from '@/assets/ajax'
import methods from '@/assets/methods-list'

export default {
  name: 'UserReview',
  components: { Pagination, SelectQueryUser },
  data() {
    return {
      api: '/admin/users/reviews',
      filter_model: [
        { text: '文章', value: 'article' },
        { text: '书籍', value: 'book' },
        { text: '电影', value: 'movie' },
      ],
      list: [],
      list_query: {
        page: 1,
        size: 10,
        keyword: '',
        model: '',
        user_id: '',
      },
      total: 0,
      is_loading: false,
    }
  },
  created() {
    this.listInit()
  },
  methods: {
    ...methods,
    formatList(list) {
      list.forEach(i => {
        const item = this.filter_model.find(j => j.value === i.model)
        i.model_str = item ? item.text : ''
      })
    },
    patchState(id) {
      ajax.patch(`${this.api}/${id}`)
        .then(() => {
          this.$message.success('操作成功')
          this.getList()
        })
        .catch(() => 1)
    },
  },
}
</script>
