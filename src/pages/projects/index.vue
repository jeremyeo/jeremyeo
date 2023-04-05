<script setup lang="ts">
import { type Project } from '~/types'

useHead({
  title: 'Projects - Jeremy Ye',
})

const { t } = useI18n()
const projects: Project[] = [
  {
    icon: 'i-fluent-hand-draw-28-regular',
    name: 'Illustrator',
    desc: 'intro.illustrator',
    url: 'https://github.com/jeremyeo/illustrator',
  },
  {
    icon: 'i-uim-chart-pie',
    name: 'Roulette',
    desc: 'intro.roulette',
    url: 'https://github.com/jeremyeo/roulette',
  },
]
</script>

<template>
  <div class="page-container">
    <h1 text-3xl font-bold mt-xl mb-4xl>
      {{ t('button.projects') }}
    </h1>
    <div grid="~ cols-2 gap-2">
      <ProjectCard
        v-for="project in projects"
        :key="project.name"
        :project="project"
        flex-1 min-w-300px
      />
    </div>
  </div>
</template>
