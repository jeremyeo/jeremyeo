<script setup lang="ts">
import { toggleDark } from '~/composables'

const { t, availableLocales, locale } = useI18n()
const router = useRouter()

const toggleLocales = () => {
  // change to some real logic
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
}
</script>

<template>
  <!-- border="b-1 gray-500/10 dark:gray-500/20" -->
  <header sticky top-0 backdrop-blur-md z-99 class="bg-blight/80 dark:bg-bdark/80" h-60px lh-60px text-center>
    <nav inline-flex="~ gap-xl" justify-between items-center w-full px-2xl>
      <div class="logo" shrink-0 text-xl select-none>
        <a cursor-pointer @click="router.push('/')">Jeremy Ye</a>
      </div>
      <div text-xl flex items-center gap-5>
        <i i="carbon-blog" icon-btn :title="t('button.blog')" @click="router.push('/blog')" />
        <i i="carbon-idea" icon-btn :title="t('button.projects')" @click="router.push('/projects')" />
        <a i="carbon-logo-github" title="GitHub" icon-btn href="https://github.com/jeremyeo" target="_blank" />
        <i i="carbon-language" icon-btn :title="t('button.toggle_langs')" @click="toggleLocales" />
        <i i="carbon-sun dark:carbon-moon" icon-btn :title="t('button.toggle_dark')" @click="toggleDark()" />
      </div>
    </nav>
  </header>
</template>
