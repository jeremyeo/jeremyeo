<script setup lang="ts">
import { articles, gotoPage, pagination } from '~/posts/dataProvider'

useHead({
  title: 'Blog - Jeremy Ye',
})

const { t } = useI18n()
const router = useRouter()
const route = useRoute()

gotoPage(Number(route.query.page) || 1)

const changePage = (page: number) => {
  router.push({ name: 'blog', query: { page } })
  gotoPage(page)
}
</script>

<template>
  <div class="page-container">
    <h1 text-4xl font-bold mt-xl mb-4xl>
      {{ t('button.blog') }}
    </h1>

    <div flex="~ col gap-xl" mb-2xl>
      <BlogCard v-for="article in articles" :key="article.id" :article="article" />
      <p v-if="!articles.length" opacity-50 px-1>
        {{ t('nothing') }}
      </p>
    </div>

    <ul flex="~ gap-xl wrap">
      <li v-for="page in pagination.pageTotal" :key="page">
        <button
          transition
          opacity-50
          hover:opacity-90
          disabled:cursor-default
          disabled:opacity-90
          :disabled="pagination.current === page"
          @click="changePage(page)"
        >
          {{ page }}
        </button>
      </li>
    </ul>
  </div>
</template>
