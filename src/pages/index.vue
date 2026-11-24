<template>
  <el-row :gutter="20">
    <el-col :span="6" v-for="(item, index) in panels"  :key="index" > 
      <el-card style="max-width: 480px">
        <template #header>
          <div class="card-header flex justify-between "> 
            <span  class="text-sm">{{ item.title }}</span>
            <el-tag :type="item.unitColor">{{ item.unit }}</el-tag>
          </div>
        </template>
        <p  class="text-3xl font-bold text-gray-500">
          <CountTo :value="item.value" />
        </p>
        <template #footer>
          <div class="flex justify-between  text-sm text-gray-500">    
            <span>{{ item.subTitle }}</span>
            <span>{{ item.subValue }}</span>
          </div>

        </template>
      </el-card>
    </el-col>
  </el-row>
  <IndexNavs/>
  <el-row :gutter="20">
            <el-col :span="12" :offset="0">
                <IndexChart/>
            </el-col>
            <el-col :span="12" :offset="0">
               <IndexCard title="店铺及商品提示" tip="店铺及商品提示" :btns="goods" class="mb-3 mt-5"/>
                <IndexCard title="交易提示" tip="需要立即处理的交易订单" :btns="order"/>

            </el-col>
  </el-row>
</template>

<script setup>
  //导入ref
  import { ref } from "vue";
  import { useStore } from "vuex";
  import { showModal, toast } from "~/composables/util";
  import { useRouter } from "vue-router";
  import { getStatistics1 ,getStatistics2} from "~/api/index";
  import CountTo from "~/components/CountTo.vue";
  import IndexNavs from "~/components/IndexNavs.vue";
  import IndexChart from "~/components/IndexChart.vue";
  import IndexCard from "~/components/IndexCard.vue";


  let panels = ref([]);

  getStatistics1().then((res) => {
    console.log(res);
    panels.value = res.panels;
  });
  const goods = ref([])
  const order = ref([])
  getStatistics2().then(res=>{
      goods.value = res.goods
      order.value = res.order
  })
</script>

<style scoped>
.fheader{
        /* 弹性布局 */
        display: flex;
        /* 垂直居中 */
        align-items: center;
         /*高度  */
        height: 64px;
        /* 背景色 */
        background-color: #f5f5f5;
        /* 固定定位 */
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        /*  */
        color: #fff; 
        z-index: 100;

    }
  </style>

