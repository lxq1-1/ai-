<script setup>

</script>

<template>
  <!-- 测试按钮 -->
  <!-- https://cn.windicss.org/utilities/borders/ring.html -->
  <!-- bg-purple-500 背景颜色-->
  <!-- hover:(bg-purple-900) 鼠标移入背景颜色-->
  <!-- transition-all 过渡时间-->
  <!-- focus:(ring-8 ring-yellow-500) 聚焦时边框颜色-->
  <!-- duration-1000 过渡时间-->
  <!-- ring-8 边框宽度-->
  <!-- rounded-full 圆角-->
  <!-- py-4 高度-->
  <!-- px-8 宽度-->
  <!-- text-pink-50 文字颜色-->
   <router-view /> 
</template>


<style>
  body{
    @apply bg-gray-100;
  }

  #nprogress .bar{
    /* !important 是 CSS 中的一个关键字，用于强制覆盖当前样式规则，其优先级高于普通样式和内联样式（除非有另一个 !important 规则）。 */
    background-color: #f4f4f4!important;
    height: 2px!important;
  }


::-webkit-scrollbar{
  width: 4px;
  height: 6px;
}
::-webkit-scrollbar-corner{
  display: block;
}
::-webkit-scrollbar-thumb{
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.2);
}
::-webkit-scrollbar-thumb,
::-webkit-scrollbar-track{
  border-right-color: transparent;
  border-left-color: transparent;
  background-color: rgba(0, 0, 0, 0.1);
} 
</style>