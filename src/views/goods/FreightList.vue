<template>
  <section>
    <!-- 表格-头部 -->
    <div class="table-header">
      <el-input v-model="list_query.keyword" placeholder="关键字" />
      <el-button plain type="primary" icon="el-icon-search" @click="listSearch">搜索</el-button>
      <el-button plain icon="el-icon-circle-close" @click="listReset">重置</el-button>
      <el-button-group>
        <el-button type="primary" @click="toAdd">添 加</el-button>
      </el-button-group>
    </div>
    <!-- 列表 -->
    <el-table v-loading="is_loading" :data="list">
      <el-table-column label="模板名称" prop="name" width="200" />
      <el-table-column label="计价方式" prop="type_str" />
      <el-table-column label="默认运费" prop="calc" />
      <el-table-column label="包邮条件" prop="free" />
      <el-table-column label="创建时间" prop="created_at" width="160" />
      <el-table-column label="更新时间" prop="updated_at" width="160" />
      <el-table-column label="操作" align="center" width="160" class-name="table-column-action">
        <template #default="scope">
          <el-button plain type="info" size="mini" icon="el-icon-edit" @click="toEdit(scope.row.id)" />
          <el-button plain type="danger" size="mini" icon="el-icon-delete" @click="delRow(scope.row.id)" />
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格-底部 -->
    <pagination v-model:page="list_query.page" v-model:size="list_query.size" :total="total" @changed="getList" />
  </section>
</template>

<script>
import Pagination from '@/components/Pagination'
import methods from '@/assets/methods-list'

export default {
  name: 'FreightList',
  components: { Pagination },
  data() {
    return {
      api: '/admin/freights',
      total: 0,
      list: [],
      list_query: {
        page: 1,
        size: 10,
        keyword: '',
      },
      is_loading: false,
    }
  },
  created() {
    this.listInit()
  },
  activated() {
    this.getList()
  },
  methods: {
    ...methods,
    formatList(list) {
      list.forEach(i => {
        const unit = ['件','kg','m³'][i.type]
        let calc = ''
        let free = ''
        calc = `${i.calc.unit}${unit} 内 ${i.calc.fee}元`
        calc = `${calc}，每增加 ${i.calc.add_unit}${unit} 加 ${i.calc.add_fee}元`
        if (i.free.fee) {
          free = `满${i.free.fee}元`
        }
        if (i.free.unit) {
          if (free) {
            free = `${free}; 或`
          }
          free = `${free}满${i.free.unit}${unit}`
        }

        i.calc = calc
        i.free = free
        i.type_str = ['按件数','按重量','按体积'][i.type]
      })
    },
  },
}
</script>
