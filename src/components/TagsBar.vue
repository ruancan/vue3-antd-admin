<template>
    <a-tag v-for="tag in tagStore.tagsList" :key="tag.name" :closable="tag.closable" @close="onClose(tag)" :color="tag.color" @click="onClick(tag)">{{tag.name}}</a-tag>
</template>

<script setup>
import router from '@/router/index.js'
import { useUserStore } from '@/stores/userStore.js'
import { tagUseStore } from '@/stores/tagStore.js'
const userStore = useUserStore()
const tagStore = tagUseStore()

const getTagIndex = (name) => {
  for (const tagIndex in tagStore.tagsList) {
    if (tagStore.tagsList[tagIndex].name === name) {
      return tagIndex
    }
  }
}
const onClose = (tag) => {
  // 如果关闭的是当前打开的这个tag,则先往前跳一格，删掉关闭的tag
  if (tag.color === 'success') {
    const index = getTagIndex(tag.name)
    tagStore.click(tagStore.tagsList[index - 1].name)
    router.push({ name: tagStore.tagsList[index - 1].name })
  }
  tagStore.remove(tag.name)
}

const onClick = (tag) => {
  if (tag.color !== 'success') {
    tagStore.click(tag.name)
    router.push({ name: tag.name })
    // 把tag的selectedKeys、openKeys更新到store中
    userStore.selectedKeys = tag.selectedKeys
    userStore.openKeys = tag.openKeys
  }
}
</script>

<style lang="less" scoped>

</style>
