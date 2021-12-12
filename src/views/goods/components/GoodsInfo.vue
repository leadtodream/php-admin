<template>
  <section>
    <el-form ref="form" :model="form" label-width="80px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="商品图片" required>
            <Draggable item-key="index" class="draggable" :list="pictures">
              <template #item="{element, index}">
                <div class="card">
                  <img alt="img" :src="element" />
                  <i class="el-icon-delete-solid" @click="delImg(index)"></i>
                </div>
              </template>
            </Draggable>
            <div v-show="pictures.length<5" class="card" @click="chooseImg">
              <i class="el-icon-plus"></i>
            </div>
            <p class="form-item-tip">最多上传5个素材，大小不超过2M，拖拽图片可进行排序。</p>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="视频介绍">
            <div v-if="form.video" class="card">
              <video :src="form.video" />
              <i class="el-icon-delete-solid" @click="form.video=''"></i>
            </div>
            <div class="card" @click="chooseVideo">
              <i :class="[is_uploading?'el-icon-loading':'el-icon-plus']"></i>
            </div>
            <p class="form-item-tip">视频时长建议60秒以内，大小不超过100M。</p>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="商品名称" required>
        <el-input v-model="form.name" maxlength="50" />
      </el-form-item>
      <el-form-item label="商品描述">
        <el-input v-model="form.intro" maxlength="50" placeholder="(选填)" />
      </el-form-item>
      <div class="el-form--inline">
        <el-form-item label="售卖价" required>
          <el-input v-model="form.price" type="number" />
        </el-form-item>
        <el-form-item label="市场价">
          <el-input v-model="form.price_line" type="number" placeholder="(选填)" />
        </el-form-item>
        <el-form-item label="库存" required>
          <el-input v-model="form.stock" type="number" />
        </el-form-item>
      </div>
      <div class="el-form--inline">
        <el-form-item label="运费模板">
          <el-select v-model="form.shop_freight_id">
            <el-option v-for="i in list_freight" :key="i.id" :label="i.name" :value="i.id">{{ i.name }}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-show="isRequireWeight" label="商品重量" required>
          <el-input v-model="form.weight">
            <template #append>kg</template>
          </el-input>
        </el-form-item>
      </div>
    </el-form>
    <input class="js-chooseimg" type="file" accept="image/*" hidden @change="uploadImg">
    <input class="js-choosevideo" type="file" accept="video/*" hidden @change="uploadVideo">
  </section>
</template>

<script>
import Draggable from 'vuedraggable'
import ajax from '@/assets/ajax'
import { uploadImage, uploadVideo } from '@/assets/ajax'

export default {
  components: { Draggable },
  props: ['info', 'imgs'],
  data() {
    return {
      list_freight: [{ id: 0, name: "包邮", type: 0 }],
      is_uploading: false,
    };
  },
  computed: {
    form() {
      return this.info
    },
    pictures() {
      return this.imgs
    },
    isRequireWeight() {
      const item = this.list_freight.find(
        (i) => i.id === this.form.shop_freight_id
      );
      return item && item.type === 1;
    },
  },
  created() {
    this.getDependence();
  },
  methods: {
    chooseImg() {
      document.querySelector('.js-chooseimg').click()
    },
    chooseVideo() {
      document.querySelector('.js-choosevideo').click()
    },
    delImg(index) {
      this.pictures.splice(index, 1)
    },
    getDependence() {
      ajax.get('/admin/goods/create')
        .then(res => {
          this.list_freight.push(...res.freights)
        })
        .catch(() => 1)
    },
    uploadImg(e) {
      const file = e.target.files[0]
      if (!file) return

      uploadImage(file)
        .then(url => {
          this.pictures.push(url)
        })
        .catch(() => 1)
    },
    uploadVideo(e) {
      const file = e.target.files[0]
      if (this.is_uploading) return
      if (!file) return
      if (file.size / 1048576 > 100) {
        this.$message.error('视频大小超过限制')
      }

      this.is_uploading = true
      uploadVideo(file)
        .then(url => {
          this.form.video = url
        })
        .finally(() => this.is_uploading = false)
        .catch(() => 1)
    },
  },
};
</script>

<style lang="scss" scoped>
.draggable {
  display: inline-block;
}

.card {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 10px 10px 10px 0;
  width: 100px;
  height: 100px;
  background: #f6f7f8;
  border-radius: 5px;
  cursor: pointer;
  overflow: hidden;
  vertical-align: top;

  .el-icon-plus {
    font-size: 28px;
    color: #8c939d;
  }

  .el-icon-loading {
    font-size: 30px;
    color: green;
  }

  .el-icon-delete-solid {
    position: absolute;
    top: 0;
    right: 0;
    background: white;
    font-size: 20px;
    color: red;
  }

  img {
    width: 100%;
    height: 100%;
    cursor: move;
  }
}

.form-item-tip {
  clear: both;
  margin: 0;
  font-size: 12px;
  color: gray;
  line-height: normal;
}
</style>