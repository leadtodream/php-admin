<template>
  <section>
    <el-header class="text-r">
      <el-button type="primary" @click="chooseImg(null)">添加轮播图</el-button>
    </el-header>
    <ul class="list">
      <li v-for="(i,index) in list" :key="index" class="item">
        <img :src="i.img" class="image pointer" @click="chooseImg(index)">
        <div>
          <el-input v-model="i.link" maxlength="100">
            <template #prepend>链接：</template>
          </el-input>
          <el-input v-model="i.sort" type="number" min="-100" max="100" placeholder="数值越大越靠前">
            <template #prepend>排序：</template>
          </el-input>
          <div class="switch">
            是否显示：<el-switch v-model="i.is_show" />
          </div>
        </div>
        <div>
          <el-button type="primary" size="mini" plain @click="edit(index)">保存</el-button>
          <el-button type="danger" size="mini" plain @click="del(index)">删除</el-button>
        </div>
      </li>
    </ul>
    <el-alert v-show="!list.length" title="暂无数据" type="info" center :closable="false" />
    <input ref="input-file" type="file" accept="image/*" hidden @change="uploadImg">
  </section>
</template>

<script>
import ajax from '@/assets/ajax'
import { uploadImage } from '@/assets/ajax'

export default {
  name: 'Slide',
  data() {
    return {
      api: '/admin/slides',
      list: [],
      list_index: null,
    }
  },
  created() {
    this.getList()
  },
  methods: {
    chooseImg(index) {
      this.list_index = index
      this.$refs['input-file'].click()
    },
    add(img) {
      ajax.post(this.api, { img })
        .then(() => {
          this.$message.success('添加成功')
          this.getList()
        })
    },
    del(index) {
      const id = this.list[index].id
      ajax.delete(`${this.api}/${id}`)
        .then(() => {
          this.list.splice(index, 1)
        })
    },
    edit(index) {
      const item = this.list[index]
      ajax.put(`${this.api}/${item.id}`, item)
        .then(() => {
          this.$message.success('保存成功')
          this.list.sort((a,b) => b.sort - a.sort)
        })
    },
    getList() {
      ajax.get(this.api)
        .then(res => {
          this.list = res
        })
    },
    uploadImg(e) {
      const files = e.target.files
      if (files.length) {
        uploadImage(files[0], 'slide')
          .then(res => {
            if (this.list_index === null) {
              this.add(res)
            } else {
              this.list[this.list_index].img = res
            }
          })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.list {
  padding: 0;
  margin: 0 20px;
}

.item {
  display: flex;
  margin-bottom: 15px;

  img {
    width: 350px;
    height: auto;
    border-radius: 5px;
  }

  > div:nth-child(2) {
    flex: 1;
    margin: 0 30px;
  }

  > div:last-child {
    width: 130px;
  }
}

.switch {
  margin: 15px 0 0 5px;
  font-size: 14px;
}
</style>
