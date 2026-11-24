<template>
  <div class="home-page">
    <el-row :gutter="16">
      <el-col :span="6">
        <el-card shadow="hover">
          <div class="stat-item">
            <div class="stat-title">商品总数</div>
            <div class="stat-num">{{ statData.goodsCount || 0 }}</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div class="stat-item">
            <div class="stat-title">上架商品</div>
            <div class="stat-num">{{ statData.onCount || 0 }}</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div class="stat-item">
            <div class="stat-title">下架商品</div>
            <div class="stat-num">{{ statData.offCount || 0 }}</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div class="stat-item">
            <div class="stat-title">今日新增</div>
            <div class="stat-num">{{ statData.todayCount || 0 }}</div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-card style="margin-top:16px">
      <h3>快捷入口</h3>
      <el-space>
        <el-button type="primary" @click="$router.push('/goods/add')">➕ 增加商品</el-button>
        <el-button type="success" @click="$router.push('/goods/list')">📋 商品列表</el-button>
      </el-space>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import axios from 'axios'

const statData = ref({})

// 获取首页统计数据
const getHomeData = async () => {
  try {
    const token = localStorage.getItem('token')
    const res = await axios.get('http://ceshi13.dishait.cn/admin/rule/1', {
      headers: { token }
    })
    if (res.data.msg === 'ok') {
      statData.value = res.data.data
    }
  } catch (err) {
    ElMessage.error('首页数据加载失败')
    console.log(err)
  }
}

onMounted(() => {
  getHomeData()
})
</script>

<style scoped>
.stat-item {
  text-align: center;
  padding:10px 0;
}
.stat-title {
  font-size:14px;
  color:#666;
}
.stat-num {
  font-size:28px;
  font-weight:bold;
  color:#409eff;
  margin-top:8px;
}
</style>
