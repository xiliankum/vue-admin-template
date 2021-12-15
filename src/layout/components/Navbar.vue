<template>
  <div class="navbar">
    <!-- 菜单折叠按钮 -->
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
    <!-- 面包屑 -->
    <breadcrumb class="breadcrumb-container" />
    <!-- 右侧用户信息 -->
    <div class="right-menu">
      <template>
        <screenfull id="screenfull" class="right-menu-item hover-effect" />
      </template>
      <el-dropdown
        class="avatar-container right-menu-item"
        trigger="click"
        @visible-change="handleUserInfo"
        @command="handleCommand"
      >
        <div class="avatar-wrapper">
          <img
            :src="user_info.avatar + '?imageView2/1/w/80/h/80'"
            class="user-avatar"
          />
          <span class="user-name">{{ user_info.username }}</span>
          <i
            :class="
              isUserInfoShow ? 'el-icon-caret-top' : 'el-icon-caret-bottom'
            "
          />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>回到主页</el-dropdown-item>
          </router-link>
          <a
            target="_blank"
            href="https://github.com/webdyc/vue-admin-template"
          >
            <el-dropdown-item>Github</el-dropdown-item>
          </a>
          <a target="_blank" href="https://webdyc.com/">
            <el-dropdown-item>博客地址</el-dropdown-item>
          </a>
          <el-dropdown-item divided @click.native="logout">
            <span style="display: block">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import Screenfull from "@/components/Screenfull";

export default {
  components: {
    Breadcrumb,
    Hamburger,
    Screenfull,
  },
  data() {
    return {
      isUserInfoShow: false,
    };
  },
  computed: {
    ...mapGetters(["sidebar", "user_info", "token"]),
  },
  methods: {
    // 菜单栏展开收起状态
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    // 用户信息展开收起状态
    handleUserInfo(bool) {
      this.isUserInfoShow = bool;
    },
    // 用户信息点击事件
    handleCommand(command) {
      this.$message("click on item " + command);
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
      // 这个系统再切换用户时，路由不会动态更新。所以需要在登出函数中加上location.reload();刷新浏览器。
      location.reload();
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  // box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        display: flex;
        align-items: center;
        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 50px;
        }
        .user-name {
          display: inline-block;
          align-content: center;
          align-items: center;
          height: 40px;
          margin-left: 6px;
          line-height: 40px;
          cursor: pointer;
        }
        .el-icon-caret-bottom,
        .el-icon-caret-top {
          cursor: pointer;
          position: absolute;
          right: -20px;
          // top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
