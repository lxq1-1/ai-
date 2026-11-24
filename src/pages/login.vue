<template>
  <div class="login-container">
    <el-row style="min-height: 100vh" class="bg-indigo-500">
      <el-col :span="16" class="flex items-center justify-center">
        <div>
          <div class="font-bold text-light-700 text-5xl mb-4">欢迎回来</div>
          <div class="text-light-700">电商后台管理系统</div>
        </div>
      </el-col>
      <el-col :span="8" class="bg-light-50 flex items-center justify-center flex-col">
        <div class="font-bold text-center-500 text-5xl mb-4">登录</div>
        <el-form ref="formRef" :rules="rules" :model="form" class="login-form" @keyup.enter="enterLogin">
          <el-form-item prop="name">
            <el-input v-model="form.name" placeholder="请输入用户名">
              <template #prefix>
                <el-icon><User /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="form.password" placeholder="请输入密码" show-password>
              <template #prefix>
                <el-icon><Lock /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" class="login-button" round color="#626aef" :loading="loading">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { login, getInfo } from '~/api/manager.js'
import { ElMessage } from 'element-plus'
import { setToken } from '~/composables/auth.js'
import { useStore } from 'vuex'

const router = useRouter()
const store = useStore()
const form = reactive({
  name: "",
  password: ""
})
const rules = reactive({
  name: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 3, max: 5, message: "请输入用户名长度3-5", trigger: "blur" }
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" }
  ]
})
const formRef = ref(null)
const loading = ref(false)

const onSubmit = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      loading.value = true
      login({ username: form.name, password: form.password })
        .then((res) => {
          setToken(res.token)
          return getInfo()
        })
        .then((res) => {
          store.commit('SET_USERINFO', res)
          ElMessage.success("登录成功")
          router.push({ path: "/" })
        })
        .catch((err) => {
          ElMessage.error(err.response?.data?.msg || err.msg || '登录失败')
        })
        .finally(() => {
          loading.value = false
        })
    } else {
      ElMessage.error('密码或用户名错误')
      return false
    }
  })
}

function enterLogin(e) {
  if (e.keyCode === 13) {
    onSubmit()
  }
}

onMounted(() => {
  document.addEventListener('keyup', enterLogin)
})

onBeforeUnmount(() => {
  document.removeEventListener('keyup', enterLogin)
})
</script>
<style scoped>
@import "/Users/xiahua/vite-project/src/css/login.css";
</style>