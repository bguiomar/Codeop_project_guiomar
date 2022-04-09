<template>
  <div class="flex flex-col bg-black px-2 py-3 text-justify">
    <h1
      class="xs:text-2xl text-xl font-bold text-white sm:text-4xl md:text-6xl"
    >
      <RouterLink to="/"> GUIOS-READS </RouterLink>
    </h1>

    <div class="flex items-center justify-between gap-3 py-2">
      <!-- tipologia-->
      <div class="flex items-center justify-start gap-3 py-2">
        <div
          class="border-r-2 border-dashed border-amber-200 pr-2 text-lg font-bold leading-loose tracking-wide text-white sm:text-2xl"
        >
          <RouterLink to="/read/"> Read </RouterLink>
        </div>
        <div
          class="border-r-2 border-dashed border-amber-200 pr-2 text-lg leading-loose tracking-wide text-white sm:text-2xl"
        >
          <RouterLink to="/reading/"> Reading</RouterLink>
        </div>
        <div class="text-lg leading-loose tracking-wide text-white sm:text-2xl">
          <RouterLink to="/wanted/"> Want to read</RouterLink>
        </div>
      </div>
      <!-- founder -->
      <div class="flex gap-1">
        <input
          type="text"
          class="mt-2 rounded-md border-2 border-amber-700 px-4"
          placeholder=" title or author"
          v-model="searchInput"
          @keyup.enter="getBooks()"
        />
        <button
          class="mt-3 rounded-md bg-orange-400 py-1 px-1 hover:bg-teal-400"
          @click="getBooks()"
        >
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
