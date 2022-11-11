<template>
  <div class="login-container">
    <div class="top">
      <div class="header">
        <span class="title">XXX平台</span>
      </div>
    </div>
    <div class="form">
      <a-form :model="form" name="login">
        <a-form-item name="username" :rules="[{required: true, message:'required username'}]">
          <a-input v-model:value="form.username">
            <template #prefix>
              <user-outlined></user-outlined>
            </template>
          </a-input>
        </a-form-item>
        <a-form-item name="password" :rules="[{required: true, message:'required password'}]">
          <a-input-password v-model:value="form.password">
            <template #prefix>
              <lock-outlined></lock-outlined>
            </template>
          </a-input-password>
        </a-form-item>
        <a-form-item>
          <a-button style="width:100%" type="primary" html-type="submit" @click="onLogin">Submit</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>

</template>

<script setup>
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { reactive } from 'vue'
import { useUserStore } from '@/stores/userStore.js'
import router from '@/router/index.js'
import { login } from '@/api/user.js'

const userStore = useUserStore()

const form = reactive({
  username: '',
  password: ''
})

const onLogin = () => {
  userStore.clean()
  login(form).then(res => {
    if (res.status === 200 && res.data.code === 20000) {
      userStore.setToken(res.data.sessionId)
      const redirect = router.currentRoute.value.query && router.currentRoute.value.query.redirect
      router.push({ path: redirect || '/' })
    } else {
      message.error(res.data.message)
    }
  })
}
</script>

<style lang="less" scoped>
.login-container{
  position: absolute;
  top:40%;
  left: 50%;
  transform: translate(-50%, -80%);
  @media (min-width: 768px){
    width:430px
  }
  @media (min-width: 350px) and(max-width: 760px){
    width: 300px;
  }
  .top{
    text-align: center;
    padding-bottom: 20px;
    .header{
      height: 44px;
      line-height: 44px;
      margin-top: 10px;
      .title{
        font-size: 33px;
        color: fade(#000, 85%);
        font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica,sans-serif;
        font-weight: 500;
        position: relative;
        top: 2px;
      }
    }
  }
  .login-form{
    height: 100%;
    padding-top: 15%;
    vertical-align: middle;
    max-width: 100%;
  }
  .title{
    font-size: 26px;
    text-align: center;
    font-weight: bold;
  }
}

</style>
