<script setup lang="ts">
import { type Project } from '~/types'

useHead({
  title: 'Projects - Jeremy Ye',
})

const { t } = useI18n()
const projects: Project[] = [
  {
    icon: 'fluent-hand-draw-28-regular',
    name: 'Illustrator',
    desc: 'intro.illustrator',
    url: 'https://github.com/jremye/illustrator',
  },
]
</script>

<template>
  <div class="page-container">
    <h1 text-4xl font-bold mt-xl mb-4xl>
      {{ t('button.projects') }}
    </h1>
    <div flex="~ wrap gap-xl">
      <ProjectCard
        v-for="project in projects"
        :key="project.name"
        :project="project"
        flex-1 min-w-300px
      />
    </div>
  </div>
</template>
