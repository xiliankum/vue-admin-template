<template>
  <div class="app-content">
    <!-- 搜索项 -->
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item label="审批人">
        <el-input
          v-model="searchForm.user"
          placeholder="审批人"
          :size="styleSize"
        />
      </el-form-item>
      <el-form-item label="用户状态">
        <el-select
          v-model="searchForm.status"
          placeholder="请选择"
          :size="styleSize"
        >
          <el-option
            v-for="item in statusArr"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :size="styleSize" @click="handleSearch">
          查询
        </el-button>
        <el-button :size="styleSize">重置</el-button>
        <el-button type="success" :size="styleSize">导出</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格配置 -->
    <div class="table-config">
      <el-button type="primary" :size="styleSize" @click="handleEdit">
        新增
      </el-button>
    </div>
    <!-- 表格内容 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="name" label="姓名" align="center" />
      <el-table-column prop="address" label="地址" align="center" />
      <el-table-column prop="tags" label="类型" align="center">
        <template slot-scope="scope">
          <el-tag v-for="item in scope.row.tags" :key="item">{{ item }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
          />
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="text"
            :size="styleSize"
            @click="handleEdit(scope.row)"
          >
            编辑
          </el-button>
          <el-button
            type="text"
            :size="styleSize"
            @click="handleEdit(scope.row)"
          >
            编辑
          </el-button>
          <el-button
            type="text"
            :size="styleSize"
            @click="handleEdit(scope.row)"
          >
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      class="table-pagination"
      :current-page="searchForm.page"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="searchForm.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <!-- 新增/编辑弹出框 -->
    <el-dialog
      v-el-drag-dialog
      :visible.sync="updateFormVisible"
      title="添加"
      @close="updateFormVisibleClose"
    >
      <el-form :model="updateForm" :label-width="formLabelWidth">
        <el-form-item label="用户名">
          <el-input
            v-model="updateForm.username"
            autocomplete="off"
            :size="styleSize"
          />
        </el-form-item>
        <el-form-item label="真实姓名">
          <el-input
            v-model="updateForm.truename"
            autocomplete="off"
            :size="styleSize"
          />
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select
            v-model="updateForm.region"
            placeholder="请选择活动区域"
            :size="styleSize"
          >
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateFormVisible = false">
          确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import defaultSettings from "@/settings";
import elDragDialog from "@/directive/el-drag-dialog";
// PersonForm的类
class PersonForm {
  // 值
  constructor() {
    // 身份证
    this.care_id = "";
    // 用户名
    this.username = "";
    // 真实姓名
    this.truename = "";
    // 手机号
    this.phone = "";
    // 密码（加密）
    this.password = "";
    // 角色类型
    this.role = "";
    // 禁启用（true：启用，false：禁用）
    this.status = false;
  }
  // 验证方法
  static getRule() {
    return {
      title: [{ required: true, message: "请填写标题名称", trigger: "blur" }],
      title_e: [{ required: true, message: "请填写权限名称", trigger: "blur" }],
    };
  }
}
export default {
  directives: { elDragDialog },
  data() {
    return {
      styleSize: defaultSettings.styleSize,
      // 搜索项
      searchForm: {
        user: "",
        region: "",
        page: 1,
        pageSize: 10,
      },
      // 状态数组
      statusArr: [
        {
          label: "启用",
          value: true,
        },
        {
          label: "禁用",
          value: false,
        },
      ],
      // 表格数据
      tableData: [
        {
          key: "1",
          name: "John Brown",
          age: 32,
          address: "New York No. 1 Lake Park",
          status: true,
          tags: ["nice", "developer"],
        },
        {
          key: "2",
          name: "Jim Green",
          age: 42,
          address: "London No. 1 Lake Park",
          status: false,
          tags: ["loser"],
        },
        {
          key: "3",
          name: "Joe Black",
          age: 32,
          address: "Sidney No. 1 Lake Park",
          status: true,
          tags: ["cool", "teacher"],
        },
      ],
      // 总条数
      total: 400,
      // 表单弹出框
      updateFormVisible: false,
      updateFormLoading: false,
      formLabelWidth: "140px",
      updateForm: new PersonForm(),
      updateFormRules: PersonForm.getRule(),
    };
  },
  methods: {
    // 筛选项提交
    handleSearch() {
      console.log("submit!");
    },
    // 打开弹框
    handleEdit() {
      this.updateFormVisible = true;
    },
    // 关闭弹窗
    updateFormVisibleClose() {
      this.updateForm = new PersonForm();
      this.updateFormRules = PersonForm.getRule();
      this.updateFormLoading = false;
      this.updateFormVisible = false;
    },
    // 弹窗表单提交
    handleSubmit() {},
    // 删除
    handleDelete() {},
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
};
</script>
