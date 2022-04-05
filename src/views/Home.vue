<template>
  Im at HOMEPAGE

  <div class="grid h-screen grid-cols-6">
    <div class="relative col-span-4 flex bg-cover bg-center">
      <img
        src="https://images.unsplash.com/photo-1494809610410-160faaed4de0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80"
        class="absolute h-screen w-full object-cover"
        alt="girl books"
      />
      <div class="flex p-24 font-serif font-semibold italic text-white">
        <h1>A room without books is like<br />a body without a soul.</h1>
      </div>
    </div>
    <div class="col-span-2 flex flex-col items-center bg-yellow-700">
      <div class="mb-3 flex justify-end gap-3">
        <div class="border-r-2 border-amber-600 pr-2 text-2xl">READ</div>
        <div class="border-r-2 border-amber-600 pr-2 text-2xl">READING</div>
        <div class="text-2xl">WANTED</div>
      </div>
      <h3 class="italic">Find your wish book</h3>
      <div>
        <input
          type="text"
          class="mt-2 rounded-md px-8 py-1"
          placeholder="title,author..."
        />
        <button class="mt-3 rounded-md bg-amber-700 py-1 px-2">Q</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      bookInfo: null,
    };
  },
  methods: {},
  mounted() {
    this.getTitle();
  },
};
</script>

//getTitle() { // const GoogleKeyAPi =
"AIzaSyCoOb4mqorydBiXUcRQbP7ptDCX1fsQr-Y", // axios //
{"https://www.googleapis.com/books/v1/volumes?q="+intitle+"&key="+GoogleKeyApi+"}
// }; // },
