<template>
  <div
    class="flex h-screen flex-col justify-between bg-[url('/images/bg-book-vintage.jpeg')]"
  >
    <RouterView />
    <footer class="flex bg-orange-300 py-12">footer</footer>
  </div>
</template>

<script>
export default {
  components: {
    name: "App",
  },
};
</script>
