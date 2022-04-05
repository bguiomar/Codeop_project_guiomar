<template>
  Im at HOMEPAGE

  <div class="grid h-screen grid-cols-6">
    <div class="relative col-span-4 flex">
      <div class="flex p-24 font-serif font-semibold italic text-black">
        <h1>A room without books is like<br />a body without a soul.</h1>
      </div>
    </div>
    <div class="col-span-2 flex flex-col items-center">
      <div class="mb-3 flex justify-end gap-3">
        <div class="border-r-2 border-amber-600 pr-2 text-2xl">READ</div>
        <div class="border-r-2 border-amber-600 pr-2 text-2xl">READING</div>
        <div class="text-2xl">WISH</div>
      </div>
      <h3 class="italic">Find your wish book</h3>
      <div>
        <input
          type="text"
          class="mt-2 rounded-md px-8 py-1"
          placeholder="title or author"
          ref="searchInput"
          @keyup.enter="getBooks()"
        />
        <button
          class="mt-3 rounded-md bg-amber-700 py-1 px-2"
          @click="getBooks()"
        >
          Q
        </button>
        <div v-if="bookInfo">
          <div v-for="book in bookInfo.items" :key="book.id">
            <p>title: {{ book.volumeInfo.title }}</p>
            <div v-for="author in book.volumeInfo.authors">
              <p>autor: {{ author }}</p>
            </div>
            <p>description: {{ book.volumeInfo.description }}</p>
            <br />
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
  mounted() {},
};
</script>

//getTitle() { // const GoogleKeyAPi =
"AIzaSyCoOb4mqorydBiXUcRQbP7ptDCX1fsQr-Y", // axios //
{"https://www.googleapis.com/books/v1/volumes?q="+intitle+"&key="+GoogleKeyApi+"}
// }; // }, /* `https://swapi.dev/api/films/${this.$route.params.id}` */
