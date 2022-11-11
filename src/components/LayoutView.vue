<template>
  <a-layout class="layout-container">
    <a-layout-sider class="menu-bar">
      <menu-bar></menu-bar>
    </a-layout-sider>
    <a-layout class="layout-main">
      <a-layout-header class="layout-header">
          <header-bar></header-bar>
      </a-layout-header>
      <a-layout-content class="layout-content">
        <div class="tabs-container">
          <tabs-bar></tabs-bar>
        </div>
        <div class="router-content">
          <router-view v-slot="{ Component }">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
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

</script>

<style lang="less" scoped>
.layout-container {
  height: 100vh;

  .menu-bar {
    overflow-y: auto;
  }

  .layout-main {
    margin: 0 16px;
    .layout-header {
      background: #fff;
    }
    .layout-content {
      .tabs-container {
        padding: 2px 0;
      }
      .router-content{
        padding: 0 32px;
        background: #fff;
        min-height:100%
      }
    }
    .layout-footer{
      text-align: center;
    }
  }
}

</style>
