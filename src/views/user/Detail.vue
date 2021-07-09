<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="grid-content">
          <el-avatar class="avatar float-r" shape="square" :size="100" :src="info.img" />
          <div class="item">
            <span>昵称：</span>{{ info.nickname }}
          </div>
          <div class="item">
            <span>姓名：</span>{{ info.realname }}
          </div>
          <div class="item">
            <span>性别：</span>{{ info.gender }}
          </div>
          <div class="item">
            <span>手机号：</span>{{ info.phone }}
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
      <el-col :span="12">
        <el-form ref="form" class="grid-content form" :model="form" label-width="5em">
          <el-form-item label="角色">
            <el-select v-model="form.role_id" placeholder="请选择所属角色" clearable>
              <el-option v-for="item in list_role" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="分组">
            <el-select v-model="form.group_id" placeholder="请选择所属分组" clearable>
              <el-option v-for="item in list_group" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="账号">
            <el-input v-model="form.username" />
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.password" />
          </el-form-item>
          <el-form-item class="text-r">
            <el-button type="primary" @click="saveInfo">保 存</el-button>
          </el-form-item>
        </el-form>
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
import { queryGroup, queryRole } from '@/assets/methods-query'

export default {
  name: 'UserDetail',
  components: { DialogMoney, DialogParent, DialogPoint },
  filters: {
    genderStr(value) {
      return value === 1 ? '男' : (value === 2 ? '女' : '')
    },
  },
  data() {
    return {
      id: 0,
      info: {
        money: '',
        point: '',
      },
      parent: {
        realname: '',
        nickname: '',
        phone: '',
      },
      form: {
        group_id: '',
        role_id: '',
        username: '',
        password: '',
      },
      list_group: [],
      list_role: [],
    }
  },
  computed: {
    parentName() {
      return `${this.parent.realname || this.parent.nickname} ${this.parent.phone}`
    },
  },
  created() {
    const { id } = this.$route.params
    this.id = Number(id)
    this.getInfo()
    this.queryRole()
    this.queryGroup()
  },
  methods: {
    ...{ queryGroup, queryRole },
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
          this.form.role_id = res.info.role_id || ''
          this.form.username = res.info.username
        })
    },
    saveInfo() {
      ajax.put(`/admin/users/${this.id}`, this.form)
        .then(() => {
          this.$message.success('保存成功')
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
