<template>
 {{msg}}
  <div>
    <a-button @click="i++">{{i}}</a-button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const msg = ref('hello world')
const i = ref(0)
</script>

<style scoped>

</style>
