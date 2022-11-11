import { defineStore } from 'pinia'

export const tagUseStore = defineStore('tagStore', {
  // persist: true,
  state: () => (
    {
      tagsList: [],
      // tag点击次数
      clickTime: 0
    }),
  getters: {
    getTagsList: (state) => { return state.tagsList }
  },
  actions: {
    clean () {
      this.tagsList = []
      this.clickTime = 0
    },
    remove (name) {
      let i = 0
      for (const tagIndex in this.tagsList) {
        if (this.tagsList[tagIndex].name === name) {
          i = tagIndex
          this.tagsList.splice(i, 1)
        }
      }
      if (this.tagsList.length === 1) {
        this.tagsList[0].closable = false
      }
    },
    add (tag) {
      let find = false
      for (const tagIndex in this.tagsList) {
        if (this.tagsList[tagIndex].name === tag.name) {
          this.tagsList[tagIndex].color = 'success'
          find = true
        } else {
          this.tagsList[tagIndex].color = 'default'
        }
      }
      if (!find) {
        this.tagsList.push({ name: tag.name, color: 'success', closable: true, openKeys: tag.openKeys, selectedKeys: tag.selectedKeys })
      }
      this.tagsList[0].closable = this.tagsList.length !== 1
    },
    click (name) {
      this.clickTime++
      for (const tagIndex in this.tagsList) {
        if (this.tagsList[tagIndex].name === name) {
          this.tagsList[tagIndex].color = 'success'
        } else {
          this.tagsList[tagIndex].color = 'default'
        }
      }
    }
  }
})
