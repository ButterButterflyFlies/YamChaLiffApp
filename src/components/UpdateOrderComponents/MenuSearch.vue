<template lang="pug">
  div.self-background
    .form-group.mx-auto#search
      label.h5.self-search-label(for="shop") 請輸入品項名稱
      input.mt-2.self-search-box.self-shadow#shop(v-model="searchString" type="text")
</template>

<script>
export default {
  name: "MenuSearch",
  data() {
    return {
      currentShop: {},
      searchString: ""
    }
  },
  methods: {
    setCurrent(data) {
      this.currentShop = data
    }
  }
}
</script>

<style lang="stylus" scoped>
  textbox-height = 35px
  textbox-color = #fbffb9
  
  bg-color = #FDD692
  label-color = #754F44
  
  .self-background
    width 100vw
    height 100vh
    z-index 10
    -webkit-print-color-adjust exact
    background-color bg-color

  #search
    width 90vw
    margin auto
    margin-top 20vh
    text-align center

  .self-search-label
    letter-spacing 5px

  .self-search-box
    -webkit-appearance none
    max-width 85vw
    height textbox-height
    border none
    border-radius 3rem
    -webkit-print-color-adjust exact
    background-color textbox-color
    font-size 1.5rem

  .self-shadow
    box-shadow 0 20px 20px rgba(0,0,0,0.10), 0 10px 10px rgba(0,0,0,0.1)
</style>