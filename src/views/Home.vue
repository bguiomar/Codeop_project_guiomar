<template>
  <div class="">
    <div class="container mx-auto bg-[url('/images/book1.jpeg')]">
      <div class="mx-auto">
        <div class="flex flex-col px-2 py-3 text-justify">
          <h1
            class="xs:text-2xl text-xl font-bold text-white sm:text-4xl md:text-6xl"
          >
            GUIOS-READS
          </h1>
          <h2
            class="text-sd font-light italic text-white sm:text-xl md:text-3xl"
          >
            "A room without books is like a body without a soul"
          </h2>
          <div class="flex items-center justify-center gap-3 py-2">
            <div
              class="border-b-2 border-dashed border-amber-200 pr-2 text-lg leading-loose tracking-wide text-white sm:text-2xl"
            >
              READ
            </div>
            <div
              class="ttext-lg border-b-2 border-dashed border-amber-200 pr-2 leading-loose tracking-wide text-white sm:text-2xl"
            >
              READING
            </div>
            <div
              class="text-lg leading-loose tracking-wide text-white sm:text-2xl"
            >
              WISH
            </div>
          </div>
        </div>
      </div>
      <!-- SEARCH INPUT-->
      <div class="container mx-auto flex flex-col items-center bg-blue-200 p-4">
        <h3 class="italic text-amber-600">Find your wish book:</h3>
        <div class="flex gap-1">
          <!-- ref pasarlo a <v-model> -->
          <input
            type="text"
            class="mt-2 rounded-md border-2 border-amber-700 py-1"
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

    <!-- BOOK LIST -->
    <div v-if="bookInfo">
      <div
        class="container mx-auto grid gap-6 bg-gray-500 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
      >
        <div class="" v-for="book in bookInfo.items" :key="book.id">
          <div class="">
            <img
              v-if="
                book.volumeInfo.imageLinks &&
                book.volumeInfo.imageLinks.smallThumbnail
              "
              :src="book.volumeInfo.imageLinks.smallThumbnail"
              alt="books images"
              class="h-56"
            />
            <img
              v-else
              src="@/images/nocoverimage.jpeg"
              alt="books images"
              class="h-56"
            />
          </div>

          <div class="bg-orange-100 text-justify">
            <p class="text-md font-bold md:text-lg">
              {{ book.volumeInfo.title }}
            </p>
            <div v-for="author in book.volumeInfo.authors" :key="author">
              <p class="text-md italic md:text-lg">{{ author }}</p>
            </div>
            <div v-if="book.volumeInfo.description">
              <p class="text-sm md:text-base">
                {{ shortDescription(book.volumeInfo.description) }}
              </p>
            </div>
          </div>
          <div class="flex gap-3 bg-blue-200 p-5">
            <button class="rounded-full bg-blue-400 p-2 text-green-400">
              <i class="fa-solid fa-circle-check"></i>
            </button>

            <button class="rounded-full bg-orange-300 px-2">
              <i class="fa-solid fa-book-open-reader"></i>
            </button>
            <button><i class="fa-solid fa-bookmark"></i></button>
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
      searchInput: null,
    };
  },
  components: {},
  methods: {
    async getBooks() {
      if (this.searchInput === "") {
        this.bookInfo = null;
        return;
      }

      try {
        const { data } = await axios(
          `https://www.googleapis.com/books/v1/volumes?q=intitle:"${this.searchInput}"|inauthor:"${this.searchInput}"&maxResults=30`
        );
        this.bookInfo = data;
      } catch (error) {
      } finally {
      }
    },
    shortDescription: (textito) => {
      return typeof textito === "string"
        ? textito.split("").slice(0, 150).join("") + "..."
        : "sin descripción";
    },
  },
};
</script>
