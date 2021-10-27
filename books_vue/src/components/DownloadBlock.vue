<template>
  <div class="download-block">
    <div class="info">
      <div class="languages">
        <span>
          {{ book.languages.length > 1 ? "Languages: " : "Language: " }}
        </span>
        <span v-for="language in book.languages" :key="language">
          {{ language }}
        </span>
      </div>
      <div>
        <span>Downloads: {{ book.download_count }}</span>
      </div>
    </div>
    <span>Download links:</span>
    <a
      v-for="format in book.formats"
      :key="format"
      :href="format"
      download
    >
      {{ format }}
    </a>
  </div>
</template>

<script>
export default {
  props: {
    book: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.download-block {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  a {
    margin-bottom: 3px;
    color: rgba(0, 0, 0, 0.884);
    &:visited {
      color: rgba(0, 0, 0, 0.137);
    }
  }

  .info {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 10px;
  }

  .languages {
    display: flex;
    flex-wrap: wrap;
    span {
      margin-right: 3px;
    }
  }
}
</style>
