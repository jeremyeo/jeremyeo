<script setup lang="ts">
import dayjs from 'dayjs'
import type { Article } from '~/types'
defineProps<{
  article: Article
}>()

const router = useRouter()
const route = useRoute()

const view = (article: Article) => {
  router.push({
    path: `/blog/${article.id}`,
    params: {
      path: route.path,
      query: JSON.stringify(route.query),
    },
  })
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
    @click="view(article)"
  >
    <div class="name" text-5>
      {{ article.title }}
    </div>
    <div class="desc" text-3 opacity-50>
      {{ dayjs(article.createDate).format('YYYY-MM-DD') }}
    </div>
  </div>
</template>
