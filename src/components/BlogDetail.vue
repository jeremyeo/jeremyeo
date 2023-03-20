<script setup lang="ts">
import dayjs from 'dayjs'
import { findArticleInfoById } from '~/articles'

defineProps<{
  frontmatter: Record<string, any>
}>()

const router = useRouter()
const route = useRoute()
const content = ref<HTMLDivElement>()
const article = findArticleInfoById((route.name as string).replace('blog-', ''))

onMounted(() => {
  const navigate = () => {
    if (location.hash) {
      let el: HTMLElement | null = document.querySelector(decodeURIComponent(location.hash))
      let elementPosition = el?.offsetTop || 0

      while (el?.offsetParent) {
        el = el.offsetParent as HTMLElement
        elementPosition += el?.offsetTop || 0
      }
      const headerOffset = 60
      const offsetPosition = elementPosition - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  const handleAnchors = (
    event: MouseEvent & { target: HTMLElement },
  ) => {
    const link = event.target.closest('a')

    if (
      !event.defaultPrevented
      && link
      && event.button === 0
      && link.target !== '_blank'
      && link.rel !== 'external'
      && !link.download
      && !event.metaKey
      && !event.ctrlKey
      && !event.shiftKey
      && !event.altKey
    ) {
      const url = new URL(link.href)
      if (url.origin !== window.location.origin)
        return

      event.preventDefault()
      const { pathname, hash } = url
      if (hash && (!pathname || pathname === location.pathname)) {
        window.history.replaceState({}, '', hash)
        navigate()
      }
      else {
        router.push({ path: pathname, hash })
      }
    }
  }

  useEventListener(window, 'hashchange', navigate)
  useEventListener(content.value!, 'click', handleAnchors, { passive: false })

  navigate()
  setTimeout(navigate, 500)
})
</script>

<template>
  <div class="page-container">
    <div
      v-if="$route.path.includes('/blog')"
      h-30px lh-30px mb-4xl
    >
      <button i-carbon-arrow-left @click="router.push('/blog')" />
    </div>
    <article ref="content" class="prose prose-truegray m-auto text-left prose-invert">
      <template v-if="$route.path.includes('/blog')">
        <h1 style="margin-bottom: 10px;">
          {{ frontmatter.title }}
        </h1>
        <p v-if="article" opacity-50 flex="~ gap-xl" style="margin-top: 0;">
          <span>Created on {{ dayjs(article.createDate).format('YYYY-MM-DD') }}</span>
          <span>Updated on {{ dayjs(article.updateDate).format('YYYY-MM-DD') }}</span>
        </p>
      </template>
      <slot />
    </article>
  </div>
</template>
