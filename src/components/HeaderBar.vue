<template>
  <div class="welcome">
    <div style="display: flex;align-items: center;">
    </div>
    <div style="margin-right: 30px">
    <a-dropdown>
      <a class="ant-dropdown-link" @click.prevent>
        欢迎 {{ userStore.userInfo.nickname }} !
        <DownOutlined />
      </a>
      <template #overlay>
        <a-menu>
          <a-menu-item>
            <a @click="onLogout">退出</a>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/userStore'
import { tagUseStore } from '@/stores/tagStore.js'
import { DownOutlined } from '@ant-design/icons-vue'
import router from '@/router/index.js'
import { logout } from '@/api/user.js'
const userStore = useUserStore()
const tagStore = tagUseStore()
const onLogout = () => {
  logout().then(res => {
    userStore.clean()
    tagStore.clean()
    router.push('/login')
  })
}
</script>

<style scoped>
.welcome {
  text-align: right;
  height:100%;
  box-shadow: 24px 4px 29px #ccc;
  display:flex;
  justify-content: space-between;
  align-items: center;
}
</style>
