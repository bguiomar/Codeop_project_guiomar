<template>
  <div>
    <div class="bg-[url('/images/bg-book-vintage.jpeg')] bg-cover">
      <div
        class="h-42 flex flex-col justify-start bg-cover px-5 py-5 text-justify"
        style="
          background-image: url('https://images.unsplash.com/photo-1513185041617-8ab03f83d6c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80');
        "
      >
        <h1 class="font-Quicksand text-8xl font-black text-white">
          <RouterLink to="/"> GUIOS-READS </RouterLink>
        </h1>

        <div class="mx-4 flex flex-wrap items-center justify-between py-3">
          <!-- tipologia-->
          <div
            class="flex items-center justify-start gap-3 rounded-md py-1 px-2 font-Quicksand text-xl leading-loose tracking-wide text-white sm:flex-wrap sm:text-3xl"
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
      <div>
        <div
          v-if="bookInfo"
          class="bg-[url('/images/bg-book-vintage.jpeg')] bg-cover"
        >
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

                <div class="mx-5 py-2 text-justify text-[#4f2c1d]">
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
                    class="rounded-full text-green-700"
                    alt="save"
                  >
                    <i
                      class="fa-solid fa-circle-check fa-xl transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
                    ></i>
                  </button>

                  <button
                    @click="addToReading(book.id, book.volumeInfo)"
                    class="px-2"
                  >
                    <i
                      class="fa-solid fa-book-open-reader fa-xl transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
                      style="color: #6e493a"
                    ></i>
                  </button>
                  <button @click="addToWanted(book.id, book.volumeInfo)">
                    <i
                      class="fa-solid fa-bookmark fa-xl transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
                      style="color: #dc793a"
                    ></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Profile -->
        <div
          v-else
          class="flex w-full justify-center py-3 md:container md:mx-auto"
        >
          <div
            class="flex-cols-2 flex items-center justify-center px-48 text-justify"
          >
            <div
              class="flex flex-col items-center rounded-2xl border-2 border-[#bf9b6f] bg-[#d6bea1] px-3 py-3"
            >
              <img
                src="/images/mefoto.jpeg"
                alt="profilephoto"
                class="h-64 rounded-xl"
              />
              <div class="flex items-center justify-start p-2 italic">
                <p>
                  Soy Guiomar y os presento a:
                  <br /><span class="font-bold">GUIOS-READS</span> <br />
                  Este proyecto nace para cubrir una necesidad particular; ya
                  que debido la ingente cantidad de libros que leo, era
                  necesario poder llevar un registro de ellos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Footer -->
  <footer class="flex h-32 flex-col items-center gap-3 bg-[#281a05] p-4 sm:p-6">
    <div class="flex items-center justify-center gap-3 text-center">
      <p class="text-md text-white sm:text-xl">Front-End Developer Course by</p>
      <p class="text-3xl text-[#404cec]">Codeop</p>
    </div>

    <div class="mt-3 flex items-center gap-4 text-sm dark:text-white sm:mt-0">
      <div
        class="flex justify-between text-center font-Updock text-3xl text-white"
      >
        Guiomar Castro
      </div>
      <a
        href="https://linkedin.com/in/blanca-guiomar-castro-gonzález-05b69971"
        class="hover:underline"
        ><i class="fa-brands fa-linkedin fa-2xl"></i
      ></a>
    </div>
  </footer>
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
