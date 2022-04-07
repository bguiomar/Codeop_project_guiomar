<template>
  <div>
    <div
      class="relative h-96 w-full bg-gradient-to-tr from-gray-700 to-amber-700 bg-cover bg-center"
    >
      <img
        src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1980&q=80')]"
        alt="bookshelf"
        class="absolute h-full w-full object-cover mix-blend-overlay"
      />
      <div class="flex flex-col items-center px-2 py-3">
        <h1 class="text-xl font-bold text-white sm:text-4xl md:text-6xl">
          GUIOS-READS
        </h1>
        <h2 class="text-lg font-light italic text-white sm:text-xl md:text-3xl">
          "A room without books is like a body without a soul"
        </h2>
        <div class="flex flex-col justify-center gap-3 py-2 text-center">
          <div
            class="border-b-2 border-dashed border-amber-200 pr-2 text-lg leading-loose tracking-wide text-white sm:text-3xl"
          >
            READ
          </div>
          <div
            class="ttext-lg border-b-2 border-dashed border-amber-200 pr-2 leading-loose tracking-wide text-white sm:text-3xl"
          >
            READING
          </div>
          <div
            class="text-lg leading-loose tracking-wide text-white sm:text-3xl"
          >
            WISH
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="flex flex-col pb-4">
    <h3 class="italic text-amber-600">Find your wish book:</h3>
    <div>
      <!-- ref pasarlo a <v-model> -->
      <input
        type="text"
        class="mt-2 rounded-md border-2 border-amber-700 py-1 md:px-8"
        placeholder="title or author"
        ref="searchInput"
        @keyup.enter="getBooks()"
      />
      <button
        class="mt-3 rounded-md bg-amber-600 py-1 px-1 hover:bg-orange-400"
        @click="getBooks()"
      >
        Q
      </button>
    </div>
  </div>
  <div class="grid grid-cols-3 bg-gray-500 px-8">
    <div v-if="bookInfo">
      <div class="bg-teal-100 px-4">
        <div v-for="book in bookInfo.items" :key="book.id">
          <p clas>title: {{ book.volumeInfo.title }}</p>
          <div v-for="author in book.volumeInfo.authors" :key="author">
            <p>autor: {{ author }}</p>
          </div>
          <p>description: {{ book.volumeInfo.description }}</p>
          <br />
          <div v-for="image in book.volumeInfo.imageLinks" :key="image">
            <img :src="image" alt="books images" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Home",
  data() {
    return {
      bookInfo: null,
    };
  },
  components: {},
  methods: {
    async getBooks() {
      if (this.$refs.searchInput.value === "") {
        this.bookInfo = null;
        return;
      }

      try {
        const { data } = await axios(
          `https://www.googleapis.com/books/v1/volumes?q=intitle:"${this.$refs.searchInput.value}"|inauthor:"${this.$refs.searchInput.value}"&maxResults=10`
        );
        this.bookInfo = data;
      } catch (error) {
      } finally {
      }
    },
  },
};
</script>

//getTitle() { // const GoogleKeyAPi =
"AIzaSyCoOb4mqorydBiXUcRQbP7ptDCX1fsQr-Y", // axios //
{"https://www.googleapis.com/books/v1/volumes?q="+intitle+"&key="+GoogleKeyApi+"}
// }; // }, /* `https://swapi.dev/api/films/${this.$route.params.id}` */
