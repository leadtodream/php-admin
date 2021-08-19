<template>
  <section>
    <!-- 表格-头部 -->
    <div class="table-header">
      <el-button-group>
        <el-button type="primary" @click="add">发布新版本</el-button>
      </el-button-group>
    </div>
    <!-- 表格-内容 -->
    <el-table v-loading="is_loading" :data="list">
      <el-table-column label="ID" prop="id" width="60" />
      <el-table-column label="版本号" prop="name" width="160" />
      <el-table-column label="简介" prop="intro" class-name="textarea" />
      <el-table-column label="下载链接">
        <template #default="scope">
          <el-link type="success" @click="copyText(scope.row.url)">复制</el-link>
        </template>
      </el-table-column>
      <el-table-column label="发布时间" prop="created_at" width="200" />
    </el-table>
    <pagination v-model:page="list_query.page" v-model:size="list_query.size" :total="total" @changed="getList" />
    <!-- 弹窗表单 -->
    <el-dialog title="版本信息" width="500px" v-model="is_show">
      <el-form label-width="5em">
        <el-form-item label="版本号">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="更新内容">
          <el-input v-model="form.intro" type="textarea" :rows="5" />
        </el-form-item>
        <el-form-item label="安装包">
          <UploadFile v-model="form.file" accept=".apk" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="is_show=false">取 消</el-button>
        <el-button type="primary" @click="submit">保 存</el-button>
      </template>
    </el-dialog>
  </section>
</template>

<script>
import UploadFile from '@/components/UploadFile'
import Pagination from '@/components/Pagination'
import ajax from '@/assets/ajax'
import { copyText } from '@/assets/methods'

export default {
  name: 'LogVersion',
  components: { Pagination, UploadFile },
  data() {
    return {
      api: '/admin/logs/version',
      total: 0,
      list: [],
      list_query: {
        page: 1,
        size: 10,
      },
      form: {
        name: '',
        intro: '',
        file: '',
      },
      is_loading: false,
      is_show: false,
    }
  },
  created() {
    this.getList()
  },
  methods: {
    copyText,
    add() {
      this.form.name = ''
      this.form.intro = ''
      this.is_show = true
    },
    getList() {
      if (this.is_loading) return
      this.is_loading = true

      ajax.get(this.api, { params: this.list_query })
        .then(res => {
          this.list = res.list
          this.total = res.total
        })
        .catch(() => 1)
        .finally(() => this.is_loading = false)
    },
    submit() {
      ajax.post(this.api, this.form)
        .then(() => {
          this.$message.success('添加成功')
          this.is_show = false
          this.getList()
        })
        .catch(() => 1)
    },
  },
}
</script>
