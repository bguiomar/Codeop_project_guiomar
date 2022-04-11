<template>
  <div>
    <div
      class="h-42 flex flex-col justify-start bg-cover px-5 py-5 text-justify"
      style="
        background-image: url('https://images.unsplash.com/photo-1513185041617-8ab03f83d6c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80');
      "
    >
      <h1 class="text-8xl font-bold text-white">
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
          <div>
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
            @keyup.enter="getBooksFromAPI()"
          />
          <button
            class="rounded-md bg-orange-400 py-1 px-1 hover:bg-teal-400"
            @click="getBooksFromAPI()"
          >
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- BOOK LIST -->
    <div class="h-full bg-[url('/images/bg-book-vintage.jpeg')] bg-cover">
      <div v-if="bookInfo">
        <div
          class="container mx-auto grid h-full gap-6 p-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          <div class="" v-for="book in bookInfo.items" :key="book.id">
            <div
              class="flex flex-col items-center rounded-2xl border-2 border-[#bf9b6f] bg-[#d6bea1]"
            >
              <div class="my-5">
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
                  src="/images/nocoverimage.jpeg"
                  alt="books images"
                  class="h-56"
                />
              </div>

              <div class="mx-5 py-2 text-justify">
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
              <div class="flex gap-3 p-5">
                <button
                  @click="addToRead(book.id, book.volumeInfo)"
                  class="rounded-full p-2 text-green-600"
                  alt="save"
                >
                  <i class="fa-solid fa-circle-check fa-xl"></i>
                </button>

                <button
                  @click="addToReading(book.id, book.volumeInfo)"
                  class="px-2"
                >
                  <i class="fa-solid fa-book-open-reader fa-xl"></i>
                </button>
                <button @click="addToWanted(book.id, book.volumeInfo)">
                  <i class="fa-solid fa-bookmark fa-xl"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="h-screen"></div>
    </div>
    <!-- CARRUSEL -->

    <div
      id="carouselExampleCrossfade"
      class="carousel slide carousel-fade relative"
      data-bs-ride="carousel"
    >
      <div class="carousel-inner relative w-full overflow-hidden">
        <div class="carousel-item activefloat-left w-full">
          <img
            src="https://mdbcdn.b-cdn.net/img/new/slides/041.webp"
            class="block w-full"
            alt="Wild Landscape"
          />
        </div>
        <div class="carousel-item float-left w-full">
          <img
            src="https://mdbcdn.b-cdn.net/img/new/slides/042.webp"
            class="block w-full"
            alt="Camera"
          />
        </div>
        <div class="carousel-item float-left w-full">
          <img
            src="https://mdbcdn.b-cdn.net/img/new/slides/043.webp"
            class="block w-full"
            alt="Exotic Fruits"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { addBook, getBooks } from "../firebase";
export default {
  name: "Home",
  data() {
    return {
      bookInfo: null,
      bookReadingInfo: null,
      searchInput: null,
      bookAdded: [],
    };
  },
  components: {},
  methods: {
    async getBooksFromAPI() {
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
    async getReadingBooks() {
      try {
        this.bookReadingInfo = await getBooks("reading");
      } catch (error) {
        console.log("error");
      }
    },
    //coge infor de la API y me crea un objeto para guardarlo en Firebase
    createBook(id, book) {
      let bookToAdd = {
        id: id,
        title: "",
        authors: null,
        description: "",
        cover: "",
      };

      if ("title" in book) {
        bookToAdd.title = book.title;
      }

      if ("authors" in book) {
        bookToAdd.authors = book.authors;
      }

      if ("description" in book) {
        bookToAdd.description = book.description;
      }

      if ("imageLinks" in book && "smallThumbnail" in book.imageLinks) {
        bookToAdd.cover = book.imageLinks.smallThumbnail;
      } else {
        bookToAdd.cover = "/images/nocoverimage.jpeg";
      }

      return bookToAdd;
    },

    addToRead(id, bookAPIInfo) {
      let book = this.createBook(id, bookAPIInfo);
      addBook(id, "read", book);
    },

    addToReading(id, bookAPIInfo) {
      let book = this.createBook(id, bookAPIInfo);
      addBook(id, "reading", book);
    },

    addToWanted(id, bookAPIInfo) {
      let book = this.createBook(id, bookAPIInfo);
      addBook(id, "wanted", book);
    },
  },
  mounted() {
    this.getReadingBooks();
  },
};
</script>
