<template>
  <div class="app-content">
    欢迎首页
    <el-button type="primary" size="small" @click="getRole">获取路由</el-button>
  </div>
</template>

<script>
import { getRole } from "@/api/user";
export default {
  data() {
    return {
      filterText: "",
    };
  },
  watch: {},

  methods: {
    getRole() {
      getRole().then((res) => {});
    },
  },
};
</script>
