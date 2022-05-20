<template>
  <main class="text-gray-700 dark:text-gray-200">
    <Header h-60px />
    <div p-4 class="body">
      <RouterView />
    </div>
    <Footer h-40px lh-40px mt-24px />
  </main>
</template>

<style scoped>
.body {
  min-height: calc(100vh - 124px);
}
</style>
