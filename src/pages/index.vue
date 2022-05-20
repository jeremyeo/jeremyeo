<script setup lang="ts">
import Introduction from '../markdown/introduction.md'
import IntroductionEN from '../markdown/introduction-en.md'
const { locale } = useI18n()
</script>

<template>
  <Introduction v-if="locale === 'zh-CN'" />
  <IntroductionEN v-else />
</template>
