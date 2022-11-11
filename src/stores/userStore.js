import { defineStore } from 'pinia'
// import { userInfo, login } from '@/api/user'
// import router from '@/router'
// import { decode } from '@/utils/tools'

export const useUserStore = defineStore('useUserStore', {
  persist: true,
  state: () => {
    return {
      menuList: {},
      userInfo: {},
      status: false,
      token: '',
      openKeys: [],
      selectedKeys: []
    }
  },
  getters: {
    getMenuList: (state) => { return state.menuList },
    getUserInfo: (state) => { return state.userInfo },
    getOpenKeys: (state) => { return state.openKeys },
    getSelectKeys: (state) => { return state.selectedKeys }
  },
  actions: {
    clean () {
      this.menuList = {}
      this.userInfo = {}
      this.status = false
      this.token = ''
      this.openKeys = []
      this.selectedKeys = []
    },
    setToken (token) {
      this.token = token
    },
    setStatus (status) {
      this.status = status
    },
    setSelectMenu (data) {
      this.openKeys = data.open
      this.selectedKeys = data.select
    },
    setUserInfo (data) {
      if (data.code === 20000) {
        this.menuList = data.data.menus
        this.userInfo = {
          username: data.data.username,
          email: data.data.email,
          nickname: data.data.nickname
        }
      } else {
        this.status = false
        this.token = ''
      }
    }
  }
})
