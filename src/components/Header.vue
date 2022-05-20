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
  <header border="b-1 gray-500/10 dark:gray-500/20" flex justify-between items-center px-xl>
    <div class="logo" shrink-0 w-240px text-xl>
      <a cursor-pointer @click="router.push('/')">Jeremy</a>
    </div>
    <div text-xl flex items-center gap-5>
      <i i="carbon-blog" icon-btn :title="t('button.blog')" @click="router.push('/blog')" />
      <i i="carbon-idea" icon-btn :title="t('button.projects')" @click="router.push('/projects')" />
      <a i="carbon-logo-github" title="GitHub" icon-btn href="https://github.com/jremye" target="_blank" />
      <i i="carbon-language" icon-btn :title="t('button.toggle_langs')" @click="toggleLocales" />
      <i i="carbon-sun dark:carbon-moon" icon-btn :title="t('button.toggle_dark')" @click="toggleDark()" />
    </div>
  </header>
</template>
