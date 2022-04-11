<template>
  <div>
    <div
      class="h-42 flex flex-col justify-start bg-cover px-5 py-3 text-justify"
      style="
        background-image: url('https://images.unsplash.com/photo-1513185041617-8ab03f83d6c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80');
      "
    >
      <h1 class="cd text-8xl font-bold text-white">
        <RouterLink to="/"> GUIOS-READS </RouterLink>
      </h1>

      <div class="mx-7 flex flex-wrap items-center justify-between py-3">
        <!-- tipologia-->
        <div
          class="flex items-center justify-start gap-3 py-1 pr-2 text-xl leading-loose tracking-wide text-white sm:flex-wrap sm:text-3xl"
        >
          <div class="border-r-2 border-dashed border-amber-200 pr-5">
            <RouterLink to="/read/"> Read </RouterLink>
          </div>
          <div class="border-r-2 border-dashed border-amber-200 pr-5">
            <RouterLink to="/reading/"> Reading</RouterLink>
          </div>
          <div
            class="rounded-xl px-5 py-3 font-extrabold text-black backdrop-brightness-200 backdrop-invert"
          >
            <RouterLink to="/wanted/"> Want to read</RouterLink>
          </div>
        </div>
        <!-- search_Bar -->
        <div class="my-3 flex items-center gap-1 py-4">
          <input
            type="text"
            class="rounded-md border-2 border-amber-700 py-0.5 px-5 md:px-10 lg:px-20"
            placeholder=" title or author"
            v-model="searchInput"
            @keyup.enter="getBooks()"
          />
          <button
            class="rounded-md bg-orange-400 py-1 px-1 hover:bg-teal-400"
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
        <div class="" v-for="book in bookInfo" :key="book">
          <div class="">
            <img
              v-if="book.cover"
              :src="book.cover"
              alt="books images"
              class="h-56"
            />
          </div>

          <div class="bg-orange-100 text-justify">
            <p class="text-md font-bold md:text-lg">
              {{ book.title }}
            </p>
            <div v-for="author in book.authors" :key="author">
              <p class="text-md italic md:text-lg">{{ author }}</p>
            </div>
            <div v-if="book.description">
              <p class="text-sm md:text-base">
                {{ shortDescription(book.description) }}
              </p>
            </div>
          </div>
          <div class="flex gap-3 bg-blue-200 p-5">
            <button
              @click="moveToRead(book.id, book.volumeInfo)"
              class="rounded-full bg-blue-400 p-2 text-green-400"
            >
              <i class="fa-solid fa-circle-check"></i>
            </button>

            <button
              @click="moveToReading(book.id, book.volumeInfo)"
              class="rounded-full bg-orange-300 px-2"
            >
              <i class="fa-solid fa-book-open-reader"></i>
            </button>
            <button @click="removeFromWanted(book.id, book.volumeInfo)">
              <i class="fa-solid fa-trash-arrow-up"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    class="mx-10 grid gap-6 bg-blue-300 bg-gray-500 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
  ></div>
</template>

<script>
import axios from "axios";
import { addBook, getBooks, removeBook, getABook } from "../firebase";
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
    async showWantedBooks() {
      try {
        this.bookInfo = await getBooks("wanted");
      } catch (error) {
        console.log("error");
      }
    },
    removeFromWanted(id) {
      removeBook(id, "wanted");
      this.showWantedBooks();
    },
    shortDescription: (textito) => {
      return typeof textito === "string"
        ? textito.split("").slice(0, 150).join("") + "..."
        : "sin descripción";
    },
    async moveToReading(id) {
      try {
        const book = await getABook(id, "wanted");
        console.log(book);
        addBook(id, "reading", book);
        this.removeFromWanted(id);
      } catch (error) {
        console.log("Error getting a book");
      }
    },
    async moveToRead(id) {
      try {
        const book = await getABook(id, "wanted");
        console.log(book);
        addBook(id, "read", book);
        this.removeFromWanted(id);
      } catch (error) {
        console.log("Error getting a book");
      }
    },
  },
  mounted() {
    this.showWantedBooks();
  },
};
</script>

<style></style>
