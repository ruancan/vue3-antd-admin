<template>
  <a-layout class="layout-container">
    <a-layout-sider class="menu-bar" width="250px">
      <menu-bar></menu-bar>
    </a-layout-sider>
    <a-layout class="layout-main">
      <a-layout-header class="layout-header">
          <header-bar></header-bar>
      </a-layout-header>
      <tabs-bar></tabs-bar>
      <a-layout-content class="layout-content">
        <div class="router-content">
          <router-view v-slot="{ Component, route }">
            <keep-alive :include="cachedViews">
              <component
                  :is="Component"
                  v-if="route.meta.keepAlive"
                  :key="route.meta.componentName"
              />
            </keep-alive>
            <component
                :is="Component"
                v-if="!route.meta.keepAlive"
                :key="route.meta.componentName"
            />
          </router-view>
        </div>
      </a-layout-content>
      <a-layout-footer class="layout-footer">ant Design @2022 created by RBB</a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script setup>
import MenuBar from '@/components/MenuBar.vue'
import HeaderBar from '@/components/HeaderBar.vue'
import TabsBar from '@/components/TagsBar.vue'
import { computed } from 'vue'
import { tagUseStore } from '@/stores/tagStore.js'

const tagStore = tagUseStore()

const cachedViews = computed(() => {
  return tagStore.cachedViews
})

</script>

<style lang="less" scoped>
.layout-container {
  height: 100vh;

  .menu-bar {
    overflow-y: auto;

  }

  .layout-main {
    .layout-header{
      background: #fff;
      padding: 0
    }
    .layout-footer{
      text-align: center;
    }
    .router-content{
      padding: 20px;
      min-height: 100%;
      //box-shadow: 24px 4px 29px #ccc;
      background: #fff;
    }
  }
}

</style>
