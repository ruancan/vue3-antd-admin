<template>
  <div class="logo">
    XXX系统
  </div>
  <a-menu
      v-model:openKeys="state.openKeys"
      v-model:selectedKeys="state.selectedKeys"
      mode="inline"
      theme="dark"
      @openChange="openChange"
      @select="select"
  >
    <template v-for="item in state.menus" :key="item.title">
      <template v-if="!item.children">
        <a-menu-item :key="item.title" :title="item.title">
          {{ item.title }}
        </a-menu-item>
      </template>
      <template v-else>
        <menu-bar-item :menu="item"></menu-bar-item>
      </template>
    </template>
  </a-menu>
</template>

<script setup>

import { reactive, onMounted, watch } from 'vue'
import MenuBarItem from '@/components/MenuBarItem.vue'
import router from '@/router/index.js'
import { useUserStore } from '@/stores/userStore.js'
import { tagUseStore } from '@/stores/tagStore.js'
import { findMenu } from '@/utils/tools'

const userStore = useUserStore()
const tagStore = tagUseStore()

// a-menu的openKeys和selectedKeys不能直接与useUserStore中的openKeys和selectedKeys进行双向绑定
// menu的title必须与路由中的name对应，默认情况根据当前路由的name查找当前选中的菜单
const state = reactive({ menus: userStore.getMenuList, openKeys: [], selectedKeys: [] })

const openChange = (open) => {
  // 每次open的时候更新一次激活的菜单
  userStore.openKeys = state.openKeys
}
const select = ({ item, key, s }) => {
  const tag = {
    name: key,
    meta: { ...userStore.routersMeta[key] },
    closable: true,
    openKeys: [...state.openKeys],
    selectedKeys: [...state.selectedKeys]
  }
  userStore.selectedKeys = state.selectedKeys
  userStore.openKeys = state.openKeys
  // 每次选中的时候，更新一次选中的菜单
  tagStore.pushTag(tag)
  tagStore.pushCache(tag)
  tagStore.click(tag)
  router.push({ name: key })
}
onMounted(() => {
  // 初始化时，如果没有打开任何菜单的话，尝试根据当前路由的name反向查找选中的菜单
  if (state.selectedKeys.length === 0) {
    const result = findMenu(state.menus, router.currentRoute.value.name)
    state.selectedKeys = result.select
    state.openKeys = result.open
  }
  tagStore.clean()
  const tag = {
    name: router.currentRoute.value.name,
    meta: { ...router.currentRoute.value.meta },
    closable: false,
    openKeys: [...state.openKeys],
    selectedKeys: [...state.selectedKeys]
  }
  tagStore.pushTag(tag)
  tagStore.pushCache(tag)
  tagStore.click(tag)
})

watch(() => tagStore.clickTime, (oldValue, newValue) => {
  // 监听tag导航的点击次数，如果次数有变化则表示要从store中更新
  console.log(userStore.selectedKeys)
  console.log(userStore.openKeys)
  state.selectedKeys = userStore.selectedKeys
  state.openKeys = userStore.openKeys
})

</script>

<style scoped>
.logo {
  text-align: center;
  line-height: 64px;
  color: #fff;
}
</style>
