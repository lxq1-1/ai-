<template>
    <el-container class="bg-white rounded" :style="{ height: (h + 'px') }">
      <el-header class="image-header">
        <el-button type="primary" size="small" @click="handleOpenCreate">新增图片分类</el-button>
         <el-button type="warning" size="small" @click="handleOpenUpload">上传图片</el-button>
      </el-header>
      <el-container>
         <image-aside ref="imageAsideRef" @change="classData"></image-aside>
       <image-main ref="ImageMainRef"></image-main> 
      </el-container>
    </el-container>
</template>
<script setup>
import ImageAside from '~/components/ImageAside.vue'
import ImageMain from '~/components/ImageMain.vue'
import { ref } from "vue";
const windowHeight = window.innerHeight || document.body.clientHeight
const h = windowHeight - 64 - 44 - 40
const imageAsideRef = ref(null)
const handleOpenCreate = ()=>{
 imageAsideRef.value.handleCreate()}

const ImageMainRef = ref(null)
 
 const classData=(id)=>{ 
  //把钱给弟弟
  ImageMainRef.value.loadData(id);
}
const handleOpenUpload = ()=>ImageMainRef.value.openUploadFile()
 

</script>
<style>
.image-header{
  border-bottom: 1px solid #eeeeee;
  @apply flex items-center;
}
  
</style>