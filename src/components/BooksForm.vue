<template>
  <div class="form-holder">
    <div class="spinner-holder" v-if="isLoading">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <form v-if="!isLoading" @submit="submitForm($event)">
      <div class="form-item">
        <label>Select subject:</label>
        <div>
          <button
            @click="setActiveSub(subject)"
            type="button"
            class="btn btn-outline-primary col-md-3 subject-select"
            v-for="(subject, index) in subjects"
            :key="index"
            :class="{'active': subject == activeSubject}"
            :title="subject">{{ subject }}</button>
        </div>
      </div>

      <div class="form-item" :class="{'disabled': activeSubject == ''}">
        <label>Select book:</label>
        <div class="books-list row">
          <div class="col-md-6" v-for="(book, index) in filteredBooks" :key="index">
            <div class="card" @click="setActiveBook(book)" :class="{'active': book.id == activeBook.id}">
              <div class="card-body">
                <h5 class="card-title">{{ book.title }}</h5>
                <p class="card-text">
                  <strong>Authors:</strong> <span v-for="(author, index) in book.authors" :key="index">{{ author.name }}&nbsp;</span>
                </p>
                <p class="card-text">
                  <strong>Subjects:</strong> <span v-for="(subject, index) in book.subjects" :key="index">{{ subject }}&nbsp;</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="form-item" :class="{'disabled': activeBook.id == null}">
        <label>Book title:</label>
        <input type="text" class="form-control" placeholder="Book title" v-model="formBook.title" name="Book title">
      </div>
      <div class="form-item" :class="{'disabled': activeBook.id == null}">
        <label>Edit author:</label>
        <div class="input-group">
          <input type="text" name="Name" placeholder="Name" class="form-control" v-model="formBook.authors[0].name">
          <input type="text" name="Birth year" placeholder="Birth year" class="form-control" v-model="formBook.authors[0].birth_year">
          <input type="text" name="Death year" placeholder="Death year" class="form-control" v-model="formBook.authors[0].death_year">
        </div>
      </div>
      <div class="form-item" :class="{'disabled': activeBook.id == null}">
        <label>Edit Subjects:</label>
        <div class="multiple-params" v-if="formBook.subjects[0] != ''">
          <div v-for="(subject,index) of formBook.subjects" :key="index" class="multiple-params__item">
            {{ subject }}
            <button class="btn btn-danger" type="button" @click="removeSubject(index)" title="Remove subject">-</button>
          </div>
        </div>
        <div class="input-group">
          <input type="text" name="Subject" placeholder="Subject name" class="form-control" v-model="newSubject">
          <button class="btn btn-secondary" type="button" @click="addNewSubject()" title="Add subject">Add</button>
        </div>
      </div>
      <div class="form-item" :class="{'disabled': activeBook.id == null}">
        <label>Bookshelf:</label>
        <div class="multiple-params" v-if="formBook.bookshelves[0] != ''">
          <div v-for="(bookshelve,index) of formBook.bookshelves" :key="index" class="multiple-params__item">
            {{ bookshelve }}
            <button class="btn btn-danger" type="button" @click="removeShelf(index)" title="Remove shelf">-</button>
          </div>
        </div>
        <div class="input-group">
          <input type="text" name="Bookshelf" placeholder="Bookshelf name" class="form-control" v-model="newShelf">
          <button class="btn btn-secondary" type="button" @click="addNewShelf()" title="Add shelf">Add</button>
        </div>
      </div>
      <div class="form-item" :class="{'disabled': activeBook.id == null}">
        <button class="btn btn-primary" type="submit" title="Save to store">Save to store</button>
      </div>
    </form>
  </div>
</template>

<script>
import { MainStore } from '@/stores/MainStore'

export default {
  name: 'BooksForm',
  setup() {
    const store = MainStore()
    return { store }
  },
  computed: {
    subjects() { 
      return this.store.subjects;
    },
    books() { 
      return this.store.books;
    },
  },
  data() {
    return {
      isLoading: false,
      activeSubject: '',
      activeBook: {},
      filteredBooks: [],
      formBook: {
        title: '',
        subjects: [''],
        bookshelves: [''],
        authors: [
          {
            birth_year: '',
            death_year: '',
            name: ''
          }
        ]
      },
      newSubject: '',
      newShelf: ''
    }
  },
  methods: {
    setActiveSub(subject) {
      if(subject == this.activeSubject) {
        this.activeSubject = '';
        this.filteredBooks = this.books;
      } else {
        this.activeSubject = subject;
        this.filterBooksBySub(subject);
      }
      this.activeBook = {};
      this.restoreFormBook();
    },
    filterBooksBySub(subject) {
      this.filteredBooks = this.books.filter((el) => {
        return el.subjects.includes(subject) || false;
      });
    },
    setActiveBook(book) {
      if(book.id == this.activeBook.id) {
        this.activeBook = {};
        this.restoreFormBook();
      } else {
        this.activeBook = book;
        this.formBook = JSON.parse(JSON.stringify(this.activeBook));
      }
    },
    submitForm(e) {
      e.preventDefault();
      this.store.updateBook(this.formBook);
      this.setActiveSub(this.activeSubject);
      alert('Book info saved successfully.');
    },
    restoreFormBook() {
      this.formBook = {
        title: '',
        subjects: [''],
        bookshelves: [''],
        authors: [
          {
            birth_year: '',
            death_year: '',
            name: ''
          }
        ]
      };
      this.newSubject = '';
      this.newShelf = '';
    },
    removeSubject(index) {
      this.formBook.subjects.splice(index, 1);
    },
    addNewSubject() {
      if(this.newSubject != '') {
        this.formBook.subjects.push(this.newSubject);
        this.newSubject = '';
      }
    },
    removeShelf(index) {
      this.formBook.bookshelves.splice(index, 1);
    },
    addNewShelf() {
      if(this.newShelf != '') {
        this.formBook.bookshelves.push(this.newShelf);
        this.newShelf = '';
      }
    },
  },
  async mounted() {
    this.isLoading = !this.isLoading;
    await Promise.all([this.store.getSubjects(), this.store.getBooks()])
    this.filteredBooks = this.books;
    this.isLoading = !this.isLoading;
  }
}
</script>

<style lang="scss" scoped>
  .form-holder {
    padding: 50px;

    .spinner-holder {
      text-align: center;
    }
    form {
      .form-item {
        display: flex;
        flex-flow: column wrap;
        max-width: 500px;
        margin: 0 0 15px 0;

        &.disabled {
          position: relative;

          &:after {
            content: "";
            display:block;
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            background: rgba(255, 255, 255, 0.6);
            cursor: not-allowed;
          }
        }
        label {
          font-weight: 600;
          font-size: 16px;
          margin: 0 0 5px 0;
        }
        .subject-select {
          margin-right: 10px;
        }
        .books-list {
          > div {
            margin-bottom: 15px;
          }
          .card {
            margin-bottom: 15px;
            height: 100%;
            transition: all 0.2s ease-in-out;
            cursor: pointer;

            &:hover {
              box-shadow: 2px 2px 10px #888888;
            }
            &.active {
              box-shadow: 2px 2px 10px #888888;
            }
          }
        }
        .multiple-params {
          display: flex;
          flex-flow: column wrap;

          &__item {
            margin: 0 0 10px 0;
          }
        }
      }
    }
  }
</style>
