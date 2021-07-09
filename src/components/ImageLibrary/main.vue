<template>
  <transition name="dialog-fade" @after-enter="enter" @after-leave="leave">
    <div v-show="is_show" class="container">
      <div class="content">
        <div class="head">
          <el-upload
            class="upload"
            :action="uploadUrl"
            :headers="uploadHeader"
            :show-file-list="false"
            :on-success="uploadSuccess"
          >
            <button class="el-button el-button--primary el-button--small">上传图片</button>
          </el-upload>
        </div>
        <div class="body">
          <ul>
            <li v-for="(i,index) in list" :key="index">
              <i class="del el-icon-delete-solid" @click="delInfo(i.id)"></i>
              <img :src="i.src" @click="chooseImg(index)">
              <div class="dimension">{{ i.dimension }}</div>
            </li>
          </ul>
          <p class="tip" :hidden="list.length>0">
            <i class="el-icon-loading" :hidden="!is_loading"></i>
            <span :hidden="is_loading">暂无图片</span>
          </p>
        </div>
        <div class="foot">
          <el-pagination background layout="pager" :total="total" @current-change="turnPage" />
          <button class="el-button el-button--success el-button--small">确定</button>
          <button class="el-button el-button--info el-button--small" @click="is_show=false">取消</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import ajax from '@/assets/ajax'
import { getAuth } from '@/assets/auth'

export default {
  name: 'ImageLibrary',
  data() {
    return {
      total: 0,
      list: [],
      list_query: {
        page: 1,
        size: 10,
      },
      is_loading: false,
      is_show: false,
      callback: null,
    }
  },
  computed: {
    uploadUrl() {
      return process.env.VUE_APP_BASE_API + '/admin/images'
    },
    uploadHeader() {
      return { Authorization: getAuth() }
    },
  },
  created() {
    this.getList()
  },
  methods: {
    enter() {
      this.getList()
    },
    leave() {
      this.$el.parentNode.removeChild(this.$el)
    },
    // 选择图片
    chooseImg(index) {
      const item = this.list[index]
      if (this.callback) {
        this.callback(item.src)
      }
      this.is_show = false
    },
    // 上传文件成功
    uploadSuccess(res) {
      if (res.code === 0) {
        this.getList()
      } else {
        this.$message.error(res.msg)
      }
    },
    turnPage(e) {
      this.list_query.page = e
      this.getList()
    },
    getList() {
      if (this.is_loading) return
      this.is_loading = true

      ajax.get('/admin/images', { params: this.list_query })
        .then(res => {
          this.list = res.list
          this.total = res.total
        })
        .finally(() => {
          this.is_loading = false
        })
    },
    delInfo(id) {
      ajax.delete(`/admin/images/${id}`)
        .then(() => {
          this.$message.success('删除成功')
          this.getList()
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  background: rgba(0,0,0,.2);
}
.content {
  margin: 150px auto 0;
  padding: 20px;
  width: 800px;
  background: white;
}
.head {
  overflow: hidden;

  .upload {
    float: right;
  }
}
.body {
  margin-top: 20px;
  height: 340px;

  ul {
    margin: 0;
    padding: 0;
  }

  li {
    position: relative;
    display: inline-block;
    margin: 0 10px 10px 0;
    width: 150px;
    height: 150px;
    vertical-align: top;
    cursor: pointer;
  }

  .del {
    position: absolute;
    right: 0;
    margin: -10px;
    font-size: 20px;
    color: orangered;

    &:hover {
      color: red;
    }
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .dimension {
    position: absolute;
    bottom: 0;
    width: 100%;
    line-height: 20px;
    text-align: center;
    color: #fff;
    background: rgba(0,0,0,.6);
  }
}
.foot {
  text-align: right;
}

.el-pagination {
  float: left;
}

.tip {
  margin: 0;
  text-align: center;
  color: gray;
  font-size: 30px;
}
</style>
