<template>
  <div class="main-page">
    <div class="main-block">
      <div class="subjects-list">
        <label
          class="subject"
          :class="{ active: subject === chosenSubject }"
          v-for="subject in subjects"
          :key="subject"
          @change="fetchBooksBySubjectLocal"
        >
          <span>{{ subject }}</span>
          <input type="radio" :value="subject" v-model="chosenSubject">
        </label>
      </div>
      <div class="books-list" v-if="books.length">
        <label
          class="book"
          :class="{ active: book === chosenBook }"
          v-for="book in books"
          :key="book.id"
        >
          <span>{{ book.title }}</span>
          <input type="radio" :value="book" v-model="chosenBook">
        </label>
      </div>
    </div>
    <div class="divider" />
    <div class="main-block">
      <transition name="book-form">
        <div class="message" v-if="!chosenSubject">Choose book subject</div>
        <BookForm
          v-if="chosenBook"
          :book="chosenBook"
          :subjects="subjects"
          @book-update="updateBookList($event)"
        />
      </transition>
    </div>
  </div>
</template>

<script>
import BookForm from '@/components/BookForm.vue';
import { fetchSubjects, fetchBooksBySubject } from '@/api';

export default {
  components: {
    BookForm,
  },
  data() {
    return {
      subjects: [],
      chosenSubject: null,
      books: [],
      chosenBook: null,
    };
  },
  async created() {
    this.subjects = await fetchSubjects();
  },
  methods: {
    async fetchBooksBySubjectLocal() {
      this.chosenBook = null;
      this.books = await fetchBooksBySubject(this.chosenSubject);
    },
    updateBookList(updatedBook) {
      const index = this.books.findIndex(book => book.id === updatedBook.id);
      this.books[index] = updatedBook;
    },
  },
};
</script>

<style lang="scss">
.main-page {
  display: flex;
  justify-content: space-between;
  width: 70%;
  margin: 100px 15%;

  .main-block {
    width: 45%;
  }

  .divider {
    width: 1px;
    align-self: auto;
    background-color: black;
  }

  .message {
    padding: 5px;
    text-align: center;
    color: rgba(0, 0, 0, 0.884);
  }

  .subjects-list {
    width: fit-content;
    margin: 0 auto 30px;
  }

  .subject {
    margin: 0 3px;
    padding: 3px 5px;
    border: 1px solid transparent;
    cursor: pointer;
    font-size: 18px;
    transition: .4s;
    &.active {
      border-color: black;
      background-color: rgba(122, 206, 211, 0.521);
    }
  }

  .books-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 85%;
    margin: 0 auto;
  }

  .book {
    margin-bottom: 8px;
    padding: 5px 8px;
    cursor: pointer;
    transition: background-color .4s;
    &.active {
      background-color: rgba(122, 206, 211, 0.205);
    }
  }
}
</style>
