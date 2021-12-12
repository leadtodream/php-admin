<template>
  <div>
    <el-collapse :model-value="['spu','sku']">
      <el-collapse-item title="商品属性" name="spu">
        <dl v-for="(i,index) in attrs" :key="index" class="spu">
          <dt>
            <span>{{ i.key }}:</span>
            <el-button type="danger" plain round size="mini" @click="delAttr(index)">删除属性</el-button>
          </dt>
          <dd v-for="j in i.values" :key="j.name">
            <UploadImg v-if="index===0" v-model="j.img" @changed="setSkusImg(j.name, $event)" />
            <el-tag closable @close="delAttrValue(index, j)">{{ j.name }}</el-tag>
          </dd>
          <dd class="el-tag el-tag--success el-tag--light pointer" @click="addAttrValue(index)">添加子属性</dd>
        </dl>
        <button type="button" class="el-button el-button--success el-button--small" @click="addAttr">添加属性</button>
      </el-collapse-item>
      <el-collapse-item title="销售规格" name="sku">
        <table class="sku">
          <tr>
            <th :colspan="attrs.length">属性</th>
            <th>价格</th>
            <th>库存</th>
            <th>状态</th>
          </tr>
          <tr v-for="(i,index) in skus" :key="index">
            <template v-for="j in i.attrs" :key="index+j.key">
              <td v-if="j.rowspan" :rowspan="j.rowspan">{{ j.value }}</td>
            </template>
            <td>
              <input v-model.number="i.price" :disabled="!i.is_sale">
              <i v-if="index===0" title="批量设置" @click="setSkusPrice">︾</i>
            </td>
            <td>
              <input v-model.number="i.stock" :disabled="!i.is_sale">
              <i v-if="index===0" title="批量设置" @click="setSkusStock">︾</i>
            </td>
            <td>
              <el-switch v-model="i.is_sale" active-color="#13ce66" />
              <span>{{ i.is_sale ? '上架' : '下架' }}</span>
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
  components: { UploadImg },
  props: ['list'],
  data() {
    return {
      attrs: [],
    }
  },
  computed: {
    skus() {
      return this.list
    },
  },
  methods: {
    addAttr() {
      Swal.fire({
        title: '请填写商品属性',
        input: 'text',
        confirmButtonText: '确 定',
        showCloseButton: true,
        inputValidator: value => {
          if (value) {
            const row = this.attrs.find(i => i.key === value)
            if (row) {
              return '该属性已添加'
            }
          }
        },
      }).then(res => {
        if (res.value) {
          this.attrs.push({
            key: res.value,
            values: [],
          })
        }
      }).catch(() => 1)
    },
    addAttrValue(index) {
      const attr = this.attrs[index]

      Swal.fire({
        title: `请填写"${attr.key}"的子属性`,
        input: 'text',
        confirmButtonText: '确 定',
        showCloseButton: true,
        inputValidator: value => {
          if (value) {
            const row = attr.values.find(i => i.name === value)
            if (row) {
              return '该子属性已添加'
            }
          }
        },
      }).then(res => {
        if (res.value) {
          attr.values.push({
            img: '',
            name: res.value,
          })

          this.setSkus()
        }
      }).catch(() => 1)
    },
    delAttr(index) {
      this.attrs.splice(index, 1)
      this.setSkus()
    },
    delAttrValue(index, value) {
      const attr = this.attrs[index]
      index = attr.values.indexOf(value)
      attr.values.splice(index, 1)
      this.setSkus()
    },
    formatSkus(rows) {
      rows.forEach((i, index_i) => {
        i.is_sale = true
        i.attrs.forEach((j, index_j) => {
          // 添加属性
          if (index_i === 0) {
            this.attrs.push({
              key: j.key,
              values: [],
            })
          }

          // 添加子属性
          const attr = this.attrs[index_j]
          const value = attr.values.find(k => k.name === j.value)
          if (!value) {
            attr.values.push({
              img: i.img,
              name: j.value,
            })
          }
        })
      })

      this.setSkus()
      this.skus.forEach(i => {
        const origin = rows.find(j => j.name === i.name)
        if (origin) {
          for (const j in i) {
            if (j !== 'attrs') {
              i[j] = origin[j]
            }
          }
        } else {
          i.is_sale = false
        }
      })
    },
    renderSkus(rows) {
      // 保留原数据
      if (rows.length) {
        rows.forEach(i => {
          const origin = this.skus.find(j => j.name === i.name)
          if (origin) {
            for (const j in i) {
              if (j !== 'attrs') {
                i[j] = origin[j]
              }
            }
          }
        })
      }

      this.skus.splice(0, this.skus.length, ...rows)
    },
    setSkus() {
      if (!this.attrs.length || !this.attrs[0].values.length) {
        return this.renderSkus([])
      }

      const length = this.attrs.length // 属性数量

      // 统计SKU数量,单元格应该横跨的行数
      let count = 1
      const rowspans = new Array(length).fill(1)
      for (let i = 0; i < length; i++) {
        count *= this.attrs[i].values.length

        for (let j = i + 1; j < length; j++) {
          rowspans[i] *= this.attrs[j].values.length
        }
      }

      // 格式化属性
      const attributes = []
      for (let i = 0; i < length; i++) {
        let index = 0 // 属性索引
        let index_value = 0 // 子属性索引
        attributes[i] = []

        for (let j = 0; j < count; j++) {
          const attr = this.attrs[i]
          const attr_value = attr.values[index_value]
          const data = {
            key: attr.key,
            value: attr_value.name,
            rowspan: 0,
          }

          const rowspan = rowspans[i]
          if (j % rowspan === 0) {
            data.rowspan = rowspan
          }
          attributes[i][j] = data

          index++
          if (index === rowspan) {
            index = 0
            index_value++
            if (index_value > attr.values.length - 1) {
              index_value = 0
            }
          }
        }
      }

      // 生成sku数据
      const skus = []
      for (let i = 0; i < count; i++) {
        const data = {
          attrs: [],
          id: 0,
          img: '',
          is_sale: true,
          name: '',
          price: '',
          stock: '',
        }

        const names = []
        attributes.forEach(j => {
          const attr = j[i]
          names.push(attr.value)
          data.attrs.push(attr)
        })
        data.name = names.join(' ')

        skus.push(data)
      }

      this.renderSkus(skus)
    },
    setSkusImg(name, img) {
      this.skus.forEach(i => {
        if (i.attrs[0].value === name) {
          i.img = img
        }
      })
    },
    setSkusPrice() {
      let price = this.skus[0].price
      price = Number(price) || 0
      price = Math.max(0, price).toFixed(2)

      this.skus.forEach(i => i.price = price)
    },
    setSkusStock() {
      let stock = this.skus[0].stock
      stock = Number(stock) || 0
      stock = Math.floor(Math.max(0, stock))

      this.skus.forEach(i => i.stock = stock)
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

  th,
  td {
    padding: 0 1em;
    height: 40px;
  }

  td {
    position: relative;
    border: 1px solid #c6d1db;

    >i {
      position: absolute;
      top: 0;
      right: 1em;
      font: normal 700 20px/40px arial;
      cursor: pointer;
    }

    > span {
      margin-left: 10px;
      vertical-align: middle;
    }
  }

  tr:first-child {
    background: lightsteelblue;
    text-align: left;
  }

  input {
    margin-left: -1em;
    text-indent: 1em;
    width: calc(100% + 2em);
    height: 100%;
    background: transparent;
    border:none;
    outline: none;
  }

  input[disabled] {
    background: #f6f7f8;
    color: #0003;
  }
}
</style>
