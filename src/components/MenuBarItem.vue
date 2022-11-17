<template>
  <template v-for="item in menus" :key="item.key">
    <template v-if="!item.children">
      <a-menu-item :key="item.title" class="menu-son">
        {{ item.title }}
      </a-menu-item>
    </template>
    <template v-else>
      <a-sub-menu :key="item.title" :title="item.title" class="menu-son">
        <menu-bar-item :menus="item.children"></menu-bar-item>
      </a-sub-menu>
    </template>
  </template>
</template>

<script setup>

defineProps(['menus'])
</script>

<style lang="less" scoped>

</style>
