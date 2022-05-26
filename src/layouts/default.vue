<template>
  <main class="text-gray-700 dark:text-gray-200">
    <Header />
    <div p-4 class="body">
      <RouterView />
    </div>
    <Footer />
  </main>
</template>

<style scoped>
.body {
  min-height: calc(100vh - 136px);
}
</style>
