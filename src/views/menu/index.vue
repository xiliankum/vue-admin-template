<template>
  <div class="app-container">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades" /> 菜单路由
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <!-- 操作类 -->
      <div class="handle-box">
        <el-button size="small" type="primary" @click="handleEdit()">添加顶级菜单</el-button>
      </div>
      <!-- 内容类 -->
      <div class="table-box">
        <el-tree
          v-loading="listLoading"
          :data="menuList"
          show-checkbox
          node-key="id"
          :expand-on-click-node="false"
          :render-content="renderContent"
        />
      </div>
    </div>
    <!-- 编辑弹出框 -->
    <el-dialog v-dialogDrag :title="isAdd ? '添加菜单' : '编辑菜单'" :visible.sync="editVisible" width="40%" :close-on-click-modal="false" :before-close="handleClose">
      <el-form ref="updateForm" :model="updateForm" label-width="100px" :rules="personFormRules">
        <el-form-item label="标题名称" prop="title">
          <el-col :span="18">
            <el-input v-model="updateForm.title" autocomplete="off" />
          </el-col>
        </el-form-item>
        <el-form-item label="权限名称" prop="title_e">
          <el-col :span="18">
            <el-input v-model="updateForm.title_e" autocomplete="off" />
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="formClose('updateForm')">取 消</el-button>
        <el-button type="primary" :loading="formLoading" @click="formEdit('updateForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import { getMenuList, updateMenu, deleteMenu } from '@/api/api.config' // 接口

// PersonForm的类
class PersonForm {
  // 值
  constructor() {
    this.title = ''
    this.title_e = ''
    this.p_id = 0
    this.id = ''
  }
  // 验证方法
  static getRule() {
    return {
      title: [{ required: true, message: '请填写标题名称', trigger: 'blur' }],
      title_e: [{ required: true, message: '请填写权限名称', trigger: 'blur' }]
    }
  }
}
export default {
  name: 'SecondHouse',
  data() {
    return {
      listLoading: false,
      // 编辑弹出框
      editVisible: false,
      formLoading: false,
      isAdd: true,
      menuList: [],
      defaultProps: {
        children: 'list',
        label: function(data, node) {
        }
      },
      updateForm: new PersonForm(),
      personFormRules: PersonForm.getRule()
    }
  },
  created() {
  },
  mounted() {
    // this.getListData()
  },
  methods: {
    getListData() {
      this.listLoading = true
    //   getMenuList().then(res => {
    //     if (res.errcode === 0) {
    //       this.menuList = res.data.map(item => {
    //         return {
    //           id: item.id,
    //           title_e: item.title_e,
    //           label: item.title,
    //           children: item.list.map(child => {
    //             return {
    //               id: child.id,
    //               title_e: child.title_e,
    //               label: child.title,
    //               type: 'child',
    //               pid: item.id
    //             }
    //           })
    //         }
    //       })
    //       this.listLoading = false
    //     } else {
    //       this.listLoading = false
    //       this.$message.error(res.errmsg)
    //     }
    //   })
    },
    // 编辑人员
    handleEdit(row, isAdd) {
      if (row) { // 编辑
        if (isAdd) {
          // 添加表单
          this.updateForm = {
            title: '',
            title_e: '',
            p_id: row.id,
            id: ''
          }
        } else {
          // 添加表单
          this.updateForm = {
            title: row.label,
            title_e: row.title_e,
            p_id: row.pid ? row.pid : 0,
            id: row.id
          }
        }
        this.isAdd = false
        this.editVisible = true
      } else { // 新增
        this.updateForm = new PersonForm()
        this.isAdd = true
        this.editVisible = true
      }
    },
    renderContent(h, { node, data, store }) {
      console.log(node, data, store)
      return (
        <span class='custom-tree-node'>
          <span>{data.label} <span style='margin-left: 20px'>{data.title_e}</span></span>
          <span>
            {
              data.type === 'child' ? '' : (<el-button size='mini' type='text' on-click={ () => this.handleEdit(data, true) }>添加子节点</el-button>)
            }
            <el-button size='mini' type='text' on-click={ () => this.handleEdit(data, false) }>修改节点</el-button>
            <el-button size='mini' type='text' class='color-danger' on-click={ () => this.handleDelete(node, data) }>删除</el-button>
          </span>
        </span>)
    },
    // 删除
    handleDelete(node, data) {
      // 二次确认删除
      this.$confirm('确定要删除吗？', '提示', {
        type: 'warning'
      })
        .then(() => {
        //   deleteMenu({ id: data.id }).then(
        //     res => {
        //       if (res.errcode == 0) {
        //         this.$message.success('删除成功')
        //         this.getListData()
        //       } else {
        //         this.$message.error(res.errmsg)
        //       }
        //     }
        //   )
        })
        .catch(() => {})
    },
    // 表单提交
    formEdit(updateForm) {
      this.$refs[updateForm].validate((valid) => {
        if (this.formLoading) {
          return
        }
        if (valid) {
          this.formLoading = true
        //   const pream = JSON.parse(JSON.stringify(this.updateForm))
        //   updateMenu(pream).then(
        //     res => {
        //       if (res.errcode == 0) {
        //         this.formClose(updateForm)
        //         this.$message.success('保存成功')
        //         this.getListData()
        //       } else {
        //         this.formLoading = false
        //         this.$message.error(res.errmsg)
        //       }
        //     }
        //   )
        }
      })
    },
    formClose(updateForm) {
      this.$refs[updateForm].resetFields()
      this.formLoading = false
      this.editVisible = false
    },
    handleClose(done) {
      // 清除表单验证
      this.$refs['updateForm'].resetFields()
      done()
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  .table-box{
    ::v-deep.custom-tree-node {
      width: 600px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      padding-right: 8px;
    }
  }

}
</style>
