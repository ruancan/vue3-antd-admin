<template>
  <a-sub-menu :key="menu.title" :title="menu.title">
    <template #title>{{ menu.title }}</template>
    <template v-for="item in menu.children" :key="item.key">
      <template v-if="!item.children">
        <a-menu-item :key="item.title" :title="item.title">
          {{ item.title }}
        </a-menu-item>
      </template>
      <template v-else>
        <menu-bar-item :menu="item"></menu-bar-item>
      </template>
    </template>
  </a-sub-menu>
</template>

<script setup>

defineProps(['menu'])
</script>

<style scoped>

</style>
