<script setup lang="ts">
import type { Component } from 'vue'
import posts from '~/posts'
const router = useRouter()
const route = useRoute()

const cpm = shallowRef<Component>()
cpm.value = defineAsyncComponent(() => new Promise((resolve) => {
  const syncModule = posts[route.params.id as string]
  if (syncModule) {
    syncModule().then((module: any) => {
      resolve(module.default)
    })
  }
  else { router.replace('/sorry') }
}))
</script>

<template>
  <div class="page-container">
    <button i-carbon-arrow-left @click="router.back()" />
  </div>
  <component :is="cpm" />
</template>
