<template>
  <div class="book-form">
    <form class="form">
      <label class="book-title">
        <span class="block-title-row">Title:</span>
        <input type="text" v-model="bookCopy.title" :readonly="!isBookEditing">
      </label>
      <div class="subjects">
        <span class="block-title-row">Subjects:</span>
        <label
          :class="{ active: bookCopy.subjects.includes(subject) }"
          v-for="(subject, index) in subjects"
          :key="index"
        >
          <span>{{ subject }}</span>
          <input
            type="checkbox"
            :value="subject"
            v-model="bookCopy.subjects"
            :disabled="!isBookEditing"
          >
        </label>
      </div>
      <div class="theme-block">
        <span class="block-title-row">
          {{ bookCopy.authors.length > 1 ? "Authors:" : "Author:" }}
        </span>
        <div class="input-block" v-for="(author, index) in bookCopy.authors" :key="index">
          <input
            class="author-input"
            type="text"
            v-model="author.name"
            :readonly="!isBookEditing"
          >
          <span>
            (<input
              class="date-input"
              type="text"
              v-model="author.birth_year"
              :readonly="!isBookEditing"
            >
            -
            <input
              class="date-input"
              type="text"
              v-model="author.death_year"
              :readonly="!isBookEditing"
            >)
          </span>
          <button
            class="button-small"
            v-if="isBookEditing"
            @click.prevent="deleteElement('authors', index)"
          >
            x
          </button>
        </div>
        <button class="button-small" v-if="isBookEditing" @click.prevent="addAuthor">
          add author
        </button>
      </div>
      <div class="theme-block">
        <span class="block-title-row">Bookshelves:</span>
          <div class="input-block" v-for="(bookshelve, index) in bookCopy.bookshelves" :key="index">
            <input
              class="bookshelve-input"
              type="text"
              v-model="bookCopy.bookshelves[index]"
              :readonly="!isBookEditing"
            >
            <button
              class="button-small"
              v-if="isBookEditing"
              @click.prevent="deleteElement('bookshelves', index)"
            >
              x
            </button>
          </div>
          <button class="button-small" v-if="isBookEditing" @click.prevent="addBookshelve">
            add bookshelve
          </button>
      </div>
      <div class="buttons-block">
        <button class="form-button" v-if="!isBookEditing" @click.prevent="turnOnBookEditing">
          Edit
        </button>
        <button class="form-button" v-if="isBookEditing" @click.prevent="saveBookLocal">
          Save
        </button>
        <button class="form-button" v-if="isBookEditing" @click.prevent="setBookCopy">
          Cancel
        </button>
      </div>
    </form>
    <DownloadBlock :book="book" />
    <transition name="popup">
      <InfoPopup v-if="popupMessage" :message="popupMessage" />
    </transition>
  </div>
</template>

<script>
import DownloadBlock from '@/components/DownloadBlock.vue';
import InfoPopup from '@/components/InfoPopup.vue';
import { saveBook } from '@/api';

export default {
  props: {
    book: {
      type: Object,
      required: true,
    },
    subjects: {
      type: Array,
      required: true,
    },
  },
  components: {
    DownloadBlock,
    InfoPopup,
  },
  data() {
    return {
      bookCopy: null,
      isBookEditing: false,
      popupMessage: null,
    };
  },
  watch: {
    book: {
      handler: 'setBookCopy',
      immediate: true,
    },
  },
  methods: {
    setBookCopy() {
      this.isBookEditing = false;
      this.bookCopy = JSON.parse(JSON.stringify(this.book));
    },
    turnOnBookEditing() {
      this.isBookEditing = true;
    },
    async saveBookLocal() {
      const updatedBook = await saveBook(this.bookCopy);

      this.$emit('book-update', updatedBook);
      this.isBookEditing = false;
      this.popupMessage = 'Book saved';
      setTimeout(() => {
        this.popupMessage = null;
      }, 1000);
    },
    addAuthor() {
      this.bookCopy.authors.push({
        name: '',
        birth_year: '',
        death_year: '',
      });
    },
    addBookshelve() {
      this.bookCopy.bookshelves.push('');
    },
    deleteElement(category, index) {
      this.bookCopy[category].splice(index, 1);
    },
  },
};
</script>

<style lang="scss">
.book-form {
  input[type=text] {
    padding: 3px 5px;
    border-bottom: 1px solid transparent;
    font: inherit;
    color: rgba(0, 0, 0, 0.884);
    transition: border-color .4s;
  }

  input:not(:read-only) {
    border-bottom-color: black;
  }

  .form {
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
  }

  .subjects {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: 10px;
    label {
      margin: 0 3px;
      padding: 3px 5px;
      transition: background-color .2s;
      &.active {
        background-color: rgba(122, 206, 211, 0.521);
      }
    }
  }

  .block-title-row {
    margin-right: 5px;
  }

  .block-title-column {
    margin-bottom: 5px;
  }

  .book-title {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    input {
      width: 100%;
    }
  }

  .theme-block {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
  }

  .input-block {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
  }

  .author-input {
    width: 60%;
  }

  .date-input {
    width: 40px;
    text-align: center;
  }

  .bookshelve-input {
    box-sizing: border-box;
    width: 80%;
  }

  .buttons-block {
    padding-top: 20px;
  }

  .button-small,
  .form-button {
    border: 1px solid black;
    background-color: rgba(122, 206, 211, 0.205);
    transition: background-color .4s;
    &:hover {
      background-color: rgba(122, 206, 211, 0.521);
    }
  }

  .button-small {
    align-self: flex-start;
    margin-top: 5px;
    padding: 2px 5px;
    border-radius: 2px;
  }

  .form-button {
    margin-right: 5px;
    padding: 5px 8px;
  }
}
</style>
