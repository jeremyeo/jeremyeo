<script setup lang="ts">
import dayjs from 'dayjs'
import type { Article } from '~/types'
defineProps<{
  article: Article
}>()

// const { t } = useI18n()
const router = useRouter()

const view = (article: Article) => {
  router.push(`/blog/${article.id}`)
}
</script>

<template>
  <div
    max-w-full
    transition="~ duration-400 ease"
    c-black dark:c-white opacity-60 hover:opacity-100
    flex="col gap-xl"
    items-center
    cursor-pointer
    title="project.name"
    @click="view(article)"
  >
    <div class="name" text-5>
      {{ article.title }}
    </div>
    <div class="desc" text-3 opacity-50>
      {{ dayjs(article.updateDate).format('YYYY-MM-DD') }}
    </div>
  </div>
</template>
