<script setup lang="ts">
import { type Project } from '~/types'
defineProps<{
  project: Project
}>()

const { t } = useI18n()
</script>

<template>
  <a
    flex items-center
    gap-xl px-3 py-4
    transition="~ duration-400 ease"
    c-black dark:c-white opacity-60 hover:opacity-100
    class="hover:bg-gray-200/30 dark:hover:bg-gray-200/05"
    :title="project.name"
    :href="project.url"
    target="_blank"
  >
    <div class="logo" i-fluent-hand-draw-28-regular text-35px opacity-50 />
    <div class="info" flex="~ col" justify-center gap-1>
      <div class="name" text-5>
        {{ project.name }}
      </div>
      <div class="desc" text-3 opacity-50>
        {{ t(project.desc) }}
      </div>
    </div>
  </a>
</template>
