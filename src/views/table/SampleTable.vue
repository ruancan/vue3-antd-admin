<template>
  <div>
    <div class="query-form">
      <a-form ref="queryFormRef">
        <a-row>
          <a-col :span="8" :offset="2">
            <a-form-item label="name">
              <a-input v-model:value="state.queryForm.name"/>
            </a-form-item>
          </a-col>
          <a-col :span="8" :offset="2">
            <a-form-item label="tags">
              <!--              <a-input v-model:value="state.form.tag"/>-->
              <a-select
                  v-model:value="state.queryForm.tag"
                  allowClear
                  :options="state.tagsOption"
              ></a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24" style="text-align: center">
            <a-button type="primary" @click.prevent="query">查询</a-button>
            <a-button style="margin-left: 10px" @click="reset">重置</a-button>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div>
      <a-button-group class="buttons">
        <a-button type="primary" @click="onAdd">新增</a-button>
        <a-button type="primary" @click="onDeleteMany">删除</a-button>
      </a-button-group>

      <a-table
          bordered
          :columns="state.columns"
          :data-source="state.data"
          :pagination="false"
          :row-selection="{ selectedRowKeys: state.selectedRowKeys, onChange: onSelectChange }"
      >
        <template #headerCell="{ column }">
          <template v-if="column.key === 'name'">
        <span>
          <smile-outlined/>
          Name
        </span>
          </template>
        </template>
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'name'">
            <a>
              {{ record.name }}
            </a>
          </template>
          <template v-else-if="column.key === 'tags'">
        <span>
          <a-tag
              v-for="tag in record.tags"
              :key="tag"
              :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
          >
            {{ tag }}
          </a-tag>
        </span>
          </template>
          <template v-else-if="column.key === 'action'">
        <span>
          <a-button style="margin-left: 16px" size="small" @click="update(record.key)">修改</a-button>
          <a-button danger size="small" @click="onDeleteOne(record.key)">删除</a-button>
        </span>
          </template>
        </template>
      </a-table>
    </div>
    <div class="pagination">
      <a-pagination
          v-model:current="state.queryForm.current"
          v-model:pageSize="state.queryForm.pageSize"
          v-model:page-size-options="state.pageSizeOptions"
          :total="state.total"
          showSizeChanger
          :show-total="()=>`共 ${state.total} 条`"
          @change="query"
      />
    </div>
    <a-modal v-model:visible="state.addFormVisible" width="900px" :title="state.formTitle" @ok="onsubmit"
             @cancel="onCancel">
      <a-form ref="addOrUpdateFormRef">
        <a-row>
          <a-col :span="8" :offset="2">
            <a-form-item label="name" :labelCol="{ span: 6, offset: 2 }">
              <a-input v-model:value="state.addOrUpdateForm.name"/>
            </a-form-item>
          </a-col>
          <a-col :span="8" :offset="2">
            <a-form-item label="age" :labelCol="{ span: 6, offset: 2 }">
              <!--              <a-input v-model:value="state.form.tag"/>-->
              <a-input
                  v-model:value="state.addOrUpdateForm.age"
              ></a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="8" :offset="2">
            <a-form-item label="address" :labelCol="{ span: 6, offset: 2 }">
              <a-input v-model:value="state.addOrUpdateForm.address"/>
            </a-form-item>
          </a-col>
          <a-col :span="8" :offset="2">
            <a-form-item label="tags" :labelCol="{ span: 6, offset: 2 }">
              <!--              <a-input v-model:value="state.form.tag"/>-->
              <a-select
                  v-model:value="state.addOrUpdateForm.tags"
                  mode="multiple"
                  :options="state.tagsOption"
              ></a-select>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>
  </div>
</template>
<script setup>
import { reactive, onMounted } from 'vue'
import { SmileOutlined } from '@ant-design/icons-vue'
import { simpleTableApi, tagsOptionApi } from '@/api/table.js'

const state = reactive({
  queryForm: {
    name: '',
    tag: '',
    pageSize: 5,
    current: 1
  },
  addFormVisible: false,
  addOrUpdateForm: {
    key: '',
    name: '',
    age: '',
    address: '',
    tags: []
  },
  formTitle: '',
  updateKey: '0',
  tagsOption: [],
  data: [],
  columns: [{
    title: '序号',
    dataIndex: 'key',
    key: 'key'
  }, {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  }, {
    title: 'Age',
    dataIndex: 'age',
    key: 'age'
  }, {
    title: 'Address',
    dataIndex: 'address',
    key: 'address'
  }, {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags'
  }, {
    title: 'Action',
    key: 'action'
  }],
  selectedRowKeys: [],
  pageSizeOptions: ['3', '5', '10'],
  total: 0
})

const getIndex = (key) => {
  for (let i = 0; i < state.data.length; i++) {
    console.log(typeof state.data[i].key, state.data[i].key, typeof key, key)
    if (state.data[i].key === key) {
      return i
    }
  }
  return -1
}

const query = () => {
  simpleTableApi({ ...state.queryForm }).then(res => {
    state.data = res.data.data
    state.total = res.data.total
  })
}

const getTagsOption = () => {
  tagsOptionApi().then(res => {
    state.tagsOption = res.data.data
  })
}

const reset = () => {
  state.queryForm.tag = ''
  state.queryForm.name = ''
  state.queryForm.pageSize = 3
  state.queryForm.current = 1
}
const onSelectChange = (selected) => {
  // antd的table的复选框不是双向绑定的，需要手动绑定
  state.selectedRowKeys = selected
  console.log(state.selectedRowKeys)
}

const onDeleteMany = () => {
  state.data = state.data.filter(item => {
    return state.selectedRowKeys.indexOf(item.key) === -1
  })
}
const onDeleteOne = (key) => {
  state.data = state.data.filter(item => {
    return item.key !== key
  })
}
const update = (key) => {
  state.formTitle = `编辑:${key}`
  state.addFormVisible = true
  state.updateKey = key
  const index = getIndex(state.updateKey)
  console.log(key, typeof key, index)
  state.addOrUpdateForm = { ...state.data[index] }
}
const onCancel = () => {
  state.addOrUpdateForm = {
    key: '',
    name: '',
    age: '',
    address: '',
    tags: []
  }
  state.addFormVisible = false
}

const onAdd = () => {
  const key = (state.data.length + 1).toString()
  state.formTitle = `新增:${key}`
  state.addFormVisible = true
  state.updateKey = key
  state.addOrUpdateForm = {
    key,
    name: '',
    age: '',
    address: '',
    tags: []
  }
}

const onsubmit = () => {
  const index = getIndex(state.addOrUpdateForm.key)
  if (index > -1) {
    state.data[index] = { ...state.addOrUpdateForm }
  } else {
    state.data.push({ ...state.addOrUpdateForm })
  }

  state.addFormVisible = false
}

onMounted(() => {
  getTagsOption()
})

</script>
<style scoped>
.form {
  padding: 0 20px 20px 20px;
}

.pagination {
  padding: 20px;
  text-align: right;
}
</style>
