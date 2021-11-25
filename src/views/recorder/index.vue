// 录音管理
<template>
  <div class="app-container">
    <div class="mb-1">
      <el-button type="primary" :size="styleSize">打开录音，请求权限</el-button>
      <el-button type="primary" :size="styleSize">关闭录音，释放资源</el-button>
      <el-button type="primary" :size="styleSize">录制</el-button>
      <el-button type="primary" :size="styleSize">停止</el-button>
      <el-button type="primary" :size="styleSize">播放</el-button>
    </div>
    <!-- 波形绘制区域 -->
    <div class="mb-1 recpower">
      <div style="height: 40px; width: 300px; background: #999; position: relative">
        <div class="recpowerx" style="height: 40px; background: #0b1; position: absolute" />
        <div class="recpowert" style="padding-left: 50px; line-height: 40px; position: relative" />
      </div>
    </div>
    <div class="mb-1 waveBox">
      <div style="border: 1px solid #ccc; display: inline-block">
        <div style="height: 100px; width: 300px" class="recwave" />
      </div>
    </div>
    <!-- 日志输出区域 -->
    <div class="mainBox">
      <div class="reclog">ffff</div>
    </div>
  </div>
</template>

<script>
import defaultSettings from '@/settings'
export default {
  data() {
    return {
      styleSize: defaultSettings.styleSize,
      filterText: ''
    }
  },
  watch: {},
  methods: {}
}
</script>
