<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12" :offset="6">
        <div class="grid-content">
          <el-avatar class="avatar float-r" shape="square" :size="100" :src="info.img" />
          <div class="item">
            <span>昵称：</span>{{ info.nickname }}
          </div>
          <div class="item">
            <span>姓名：</span>{{ info.realname }}
          </div>
          <div class="item">
            <span>性别：</span>{{ genderStr }}
          </div>
          <div class="item">
            <span>生日：</span>{{ info.birthday }}
          </div>
          <div class="item">
            <span>手机号：</span>{{ info.phone }}
          </div>
          <div class="item">
            <span>邮箱：</span>{{ info.email }}
          </div>
          <div class="item">
            <span>所在地：</span>{{ info.region }}
          </div>
          <div class="item">
            <span>余额：</span>￥{{ info.money }}
            <el-button type="info" size="mini" plain @click="showDialogMoney">充 值</el-button>
          </div>
          <div class="item">
            <span>积分：</span>{{ info.point }}
            <el-button type="info" size="mini" plain @click="showDialogPoint">充 值</el-button>
          </div>
          <div class="item">
            <span>推荐人：</span>{{ parentName }}
            <el-button type="info" size="mini" plain @click="showDialogParent">修 改</el-button>
          </div>
          <div class="item">
            <span>注册时间：</span>{{ info.created_at }}
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- 弹窗 -->
    <DialogMoney ref="dialogMoney" @changed="getInfo" />
    <DialogParent ref="dialogParent" @changed="getInfo" />
    <DialogPoint ref="dialogPoint" @changed="getInfo" />
  </div>
</template>

<script>
import DialogMoney from './components/DialogMoney'
import DialogParent from './components/DialogParent'
import DialogPoint from './components/DialogPoint'
import ajax from '@/assets/ajax'

export default {
  name: 'UserDetail',
  components: { DialogMoney, DialogParent, DialogPoint },
  data() {
    return {
      id: 0,
      info: {
        gender: '',
        money: '',
        point: '',
      },
      parent: {
        realname: '',
        nickname: '',
        phone: '',
      },
    }
  },
  computed: {
    genderStr() {
      const { gender } = this.info
      let str = ''
      if (gender !== '') {
        str = ['保密','男','女'][gender]
      }

      return str
    },
    parentName() {
      return `${this.parent.realname || this.parent.nickname} - ${this.parent.phone}`
    },
  },
  created() {
    const { id } = this.$route.params
    this.id = Number(id)
    this.getInfo()
  },
  methods: {
    showDialogMoney() {
      this.$refs.dialogMoney.showDialog(this.id)
    },
    showDialogParent() {
      this.$refs.dialogParent.showDialog(this.id)
    },
    showDialogPoint() {
      this.$refs.dialogPoint.showDialog(this.id)
    },
    getInfo() {
      ajax.get(`/admin/users/${this.id}`)
        .then(res => {
          const parent = res.parent || { realname: '', nickname: '', phone: '' }

          Object.assign(this.info, res.info)
          Object.assign(this.parent, parent)
        })
    },
  },
}
</script>

<style lang="scss" scoped="">
main {
  background: unset;
}
.grid-content {
  padding: 10px;
  overflow: hidden;
  border-radius: 4px;
  background: white;

  .item {
    margin: 10px 20px;

    > span {
      display: inline-block;
      width: 5em;
      margin-right: 5px;
      text-align: right;
      color: gray;
    }
  }
}
.avatar {
  margin: 5px;
}

.form {
  padding-top: 20px;
  padding-right: 20px;
}
::v-deep(.el-dialog) {
  width: 500px;

  .el-select {
    width: 100%;
  }
}

// 按钮
.el-button {
  margin-left: 1em;
}

// 弹窗
.dialog {
  .item {
    margin-bottom: 30px;
  }
}
</style>
