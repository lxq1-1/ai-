<template>
  <div class="fheader">
    <el-icon class="ml-5 pointer-icon" style="font-size: 24px;">
      <VideoCameraFilled />
    </el-icon>
    <span class="text-2xl font-bold ml-5">后台管理系统</span>


    <div class="ml-auto">
      <el-tooltip effect="dark" content="全屏" placement="bottom">
        <el-icon class="mr-5 pointer-icon" @click="toggle" style="font-size: 20px;">
          <FullScreen v-if="!isFullScreen" />
        </el-icon>
      </el-tooltip>
      <el-tooltip effect="dark" content="刷新" placement="bottom">
        <el-icon class="mr-3 pointer-icon" @click="handleRefresh" style="font-size: 20px;">
          <Refresh />
        </el-icon>
      </el-tooltip>

      <el-dropdown class="dropdown" @command="handleCommand">
        <span class="el-dropdown-link">
          <el-avatar :size="30" :src="$store.state.user.avatar" />
          {{ $store.state.user.username }}
          <el-icon class="ml-2 pointer-icon">
            <ArrowDown />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="rePassword">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

    <form-drawer ref="formDrawerRef" title="修改密码" @submit="onSubmit">
      <el-form ref="formRef" :rules="rules" :model="form" label-width="80px" size="small">
        <el-form-item prop="oldpassword" label="旧密码">
          <el-input v-model="form.oldpassword" placeholder="请输入旧密码"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="新密码">
          <el-input type="password" v-model="form.password" placeholder="请输入新密码" show-password></el-input>
        </el-form-item>
        <el-form-item prop="repassword" label="确认密码">
          <el-input type="password" v-model="form.repassword" placeholder="请确认新密码" show-password></el-input>
        </el-form-item>
      </el-form>
    </form-drawer>
  </div>
</template>

<style scoped>
.fheader {
  display: flex;
  align-items: center;
  height: 64px;
  background-color: #655fb8;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  color: #fff;
  padding: 0 12px;
  z-index: 99;
}
.fheader :deep(.el-dropdown-link) {
  color: white;
  display: flex;
  align-items: center;
}
.pointer-icon {
  cursor: pointer;
}
.pointer-icon:hover {
  color: #b69dd7;
}
</style>

<script setup>
import api from '~/api/manager.js'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { showModal, toast } from '~/composables/util.js'
import { useFullscreen } from '@vueuse/core'
import { ref, reactive } from 'vue'
import {
  VideoCameraFilled,
  Fold,
  FullScreen,
  Close,
  Refresh,
  ArrowDown
} from '@element-plus/icons-vue'
import FormDrawer from '~/components/FormDrawer.vue'
const { logout, updatePassword } = api

const store = useStore()
const router = useRouter()
const { isFullScreen, toggle } = useFullscreen()

const formDrawerRef = ref(null)
const formRef = ref(null)

const form = reactive({
  oldpassword: "",
  password: "",
  repassword: ""
})

const rules = {
  oldpassword: [
    { required: true, message: '旧密码不能为空', trigger: 'blur' }
  ],
  password: [
    { required: true, message: "新密码不能为空", trigger: 'blur' }
  ],
  repassword: [
    { required: true, message: "确认密码不能为空", trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== form.password) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

const onSubmit = () => {
  formRef.value.validate(async (valid) => {
    if (!valid) return
    formDrawerRef.value.showLoading()
    try {
      await updatePassword(form)
      toast('修改密码成功，请重新登录')
      store.dispatch('logout')
      router.push('/login')
    } catch (err) {
      toast(err.response?.data?.msg || '修改密码失败', 'error')
    } finally {
      formDrawerRef.value.hideLoading()
    }
  })
}

const handleRefresh = () => {
  location.reload()
}

const handleCommand = (command) => {
  if (command === 'rePassword') {
    formDrawerRef.value.open()
    formRef.value?.clearValidate()
    form.oldpassword = ''
    form.password = ''
    form.repassword = ''
  } else if (command === 'logout') {
    handleLogout()
  }
}

function handleLogout() {
  showModal("是否要退出登录？").then(() => {
    logout().finally(() => {
      store.dispatch("logout")
      router.push("/login")
      toast("退出登录成功")
    })
  })
}
</script>