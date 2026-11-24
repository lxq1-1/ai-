<template> 
    <el-container> 
        
        <el-header>
            <f-header></f-header>
        </el-header>

        <el-container>
            <el-aside :width="$store.state.asideWidth" ><f-menu></f-menu></el-aside>
            <el-main>
                <f-tag-list></f-tag-list>
               <div class="page-content">
                    <router-view v-slot="{ Component }">
                        <keep-alive :max="10">
                            <component :is="Component"></component>
                        </keep-alive>
                    </router-view>
                </div>
            </el-main>
        </el-container> 
    </el-container>  
</template>


<script setup>
    import FTagList from '~/layouts/componen/FTagLIst.vue'
    import FHeader from '~/layouts/componen/FHeader.vue'
    import FMenu from '~/layouts/componen/FMenu.vue'

</script>

<style scoped>

*{
    margin: 0;
    padding: 0; 
}
.el-aside{
    transition: all 0.2s;
}

.page-content {
    margin-top: 44px; /* 标签页的高度 */
    padding: 15px;
    min-height: calc(100vh - 108px); /* 视口高度 - 头部高度 - 标签页高度 */
}
</style>
