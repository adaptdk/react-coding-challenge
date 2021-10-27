<template>
  <div class="info-popup">
    <span class="popup-message">{{ message }}</span>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.info-popup {
  position: absolute;
  bottom: 80px;
  left: 45%;
  width: 10%;
  min-width: fit-content;

  .popup-message {
    box-sizing: content-box;
    padding: 15px 25px;
    background-color: rgba(122, 206, 211, 0.521);
  }
}
</style>
