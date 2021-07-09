<template>
  <div>
    <el-collapse :value="['1','2']">
      <el-collapse-item title="商品属性" name="1">
        <dl v-for="(i,index_i) in list_spu" :key="index_i" class="spu">
          <dt>
            <span>{{ i.name }}：</span>
            <el-button type="danger" plain round size="mini" @click="delSpu(index_i)">删除属性</el-button>
          </dt>
          <dd v-for="(j,index_j) in i.children" :key="index_j">
            <UploadImg v-if="!index_i" v-model="j.img" module="shop_goods_sku" @changed="setSkuImg" />
            <div class="el-tag el-tag--info el-tag--light">
              {{ j.name }}
              <i class="el-tag__close el-icon-close" @click="delSpuChild(index_i,index_j)" />
            </div>
          </dd>
          <dd class="el-tag el-tag--success el-tag--light pointer" @click="addSpuChild(index_i)">添加规格</dd>
        </dl>
        <button type="button" class="el-button el-button--primary is-plain" @click="addSpu">添加属性</button>
      </el-collapse-item>
      <el-collapse-item title="销售规格" name="2">
        <table class="sku">
          <tr>
            <th :colspan="list_spu.length">规格</th>
            <th>价格</th>
            <th>库存</th>
          </tr>
          <tr v-for="(i,index_i) in list_sku" :key="index_i">
            <template v-for="(j,index_j) in i.attrs">
              <td v-if="j.rowspan" :key="index_j" :rowspan="j.rowspan">{{ j.value }}</td>
            </template>
            <td>
              <input v-model.number="i.price">
            </td>
            <td>
              <input v-model.number="i.stock">
            </td>
          </tr>
        </table>
      </el-collapse-item>
    </el-collapse>
  </div>    
</template>

<script>
import Swal from 'sweetalert2'
import UploadImg from '@/components/UploadImg'

export default {
  name: 'GoodsSku',
  components: { UploadImg },
  props: {
    value: {
      type: Array,
      required: false,
      default: null
    },
  },
  data() {
    return {
      list_spu: [],
      list_sku: [],
    }
  },
  watch: {
    value(val) {
      if (val.length && !this.list_spu.length) {
        console.log('初始化商品属性')
        this.initSpu()
        this.list_sku.push(...this.value)
      }
    },
  },
  methods: {
    initSpu() {
      const list = []
      this.value.forEach(i => {
        i.attrs.forEach((j, index) => {
          if (!list[index]) {
            list[index] = { name: j.name, children: [] }
          }
          list[index].children.push({
            name: j.value,
            img: j.img || '',
          })
        })
      })

      this.list_spu.push(...list)
    },
    checkSpu() {
      const list = this.list_spu
      if (list.length > 1) {
        for (const i of list) {
          if (!i.children.length) {
            this.$message.error(`请添加${i.name}属性`)
            return false
          }
        }
      }

      return true
    },
    async addSpu() {
      const { value } = await Swal.fire({
        title: '请填写商品属性',
        input: 'text',
      })
      if (value) {
        this.list_spu.push({
          name: value,
          children: [],
        })
      }
    },
    async addSpuChild(index) {
      const data = { name: '' }
      const { value } = await Swal.fire({
        title: '请填写商品规格',
        input: 'text',
      })
      if (!value) return
      if (!index) data.cover = ''
      data.name = value
      this.list_spu[index].children.push(data)
      this.setSku()
    },
    delSpu(index) {
      this.list_spu.splice(index, 1)
      this.setSku()
    },
    delSpuChild(index1, index2) {
      this.list_spu[index1].children.splice(index2, 1)
      this.setSku()
    },
    setSku() {
      const list = []
      const list_prop = []
      const list_spu = this.list_spu
      const list_sku = this.list_sku
      const length_spu = list_spu.length // spu数量
      let length_sku = 1 // sku数量
      const rowspans = new Array(length_spu).fill(1) // 单元格应该横跨的行数

      if (!length_spu || !list_spu[0].children.length) {
        this.list_sku = []
        this.$emit('input', [])
        return
      }

      // 计算SKU个数
      for (let i = 0; i < length_spu; i++) {
        list_prop.push([])
        length_sku *= list_spu[i].children.length

        for (let j = i + 1; j < length_spu; j++) {
          rowspans[i] *= list_spu[j].children.length
        }
      }

      // 格式化SPU
      for (let i = 0; i < length_spu; i++) {
        let index = 0
        let index_child = 0

        for (let j = 0; j < length_sku; j++) {
          const rowspan = rowspans[i]
          const spu = list_spu[i]
          const spu_child = spu.children[index_child]
          const data = {
            name: spu.name,
            value: spu_child.name,
            img: spu_child.img,
          }

          if (j % rowspan === 0) {
            data.rowspan = rowspan
          }
          list_prop[i][j] = data

          index++
          if (index === rowspan) {
            index = 0
            index_child++
            if (index_child > list_spu[i].children.length - 1) {
              index_child = 0
            }
          }
        }
      }

      // 生成SKU列表
      for (let i = 0; i < length_sku; i++) {
        const attrs = []
        const data = { price: '', tock: '' }

        list_prop.forEach(j => attrs.push(j[i]))

        const attr = attrs.map(j => j.value).join()
        const data_old = list_sku.find(j => j.attr === attr)
        if (data_old) {
          Object.assign(data, data_old)
        }

        data.attr = attr
        data.attrs = attrs
        list.push(data)
      }

      this.list_sku = list
      this.setSkuImg()
      this.$emit('input', this.list_sku)
    },
    setSkuImg() {
      const first_spu_children = this.list_spu[0]?.children
      if (first_spu_children) {
        this.list_sku.forEach(i => {
          const first_spu_value = i.attrs?.[0]?.value
          if (first_spu_value) {
            const spu = first_spu_children.find(j => j.name === first_spu_value)
            if (spu) {
              i.img = spu.img
            }
          }
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
/* 属性 */
.spu {
  margin-top: 0;

  dt {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1em;
    background: lightsteelblue;
    font-weight: bold;
    line-height: 40px;
  }

  dd {
    display: inline-block;
    vertical-align: top;
    margin: 1em 1em 1em 0;

    img {
      width: 100px;
      height: 100px;
      cursor: pointer;
    }
  }

  > button {
    margin-top: 1em;
  }
}

/* 规格 */
.sku {
  width: 100%;
  border-collapse: collapse;

  td {border: 1px solid #c6d1db};
  th,
  td {
    padding: 0 1em;
    height: 40px;
  }

  tr:first-child {
    background: lightsteelblue;
    text-align: left;
  }
  input {
    width: 100%;
    height: 100%;
    border:none;
    outline: none;
  }
}
</style>