<template>
  <div style="padding: 20px;">
    <el-button type="primary" @click="setCookie">设置cookie</el-button>
    <el-button type="primary" @click="getCookie">获取cookie</el-button>
    <el-button type="primary" @click="deleteCookie">删除cookie</el-button>
  </div>
</template>
<script setup>
import { useCookies } from '@vueuse/integrations/useCookies'
const cookies = useCookies()
function setCookie() {
  cookies.set('admin-token', '1234556')
}
function getCookie() {
  console.log(cookies.get('admin-token'))
}
function deleteCookie() {
  cookies.remove('admin-token')
}
</script>