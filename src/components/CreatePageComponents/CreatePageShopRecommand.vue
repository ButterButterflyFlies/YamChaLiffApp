<template lang="pug">
  div
    .mx-auto.mt-3.self-pull-bar
    p.h1.text-center.mt-4.self-title 熱門店家
    .mt-2.self-menu-section(v-if="isLoading")
      .col-11.mx-auto.row.mt-4.mb-3.p-3.self-result(
        v-for="(shop, index) in shopList" :key="index"
        @click="openPage(shop)")
        .col-2.align-self-center
          .self-icon
            i.fas.fa-coffee

        .col-1
        .col-7.align-self-center
          p.mb-0 {{shop.group_name}}
    .mt-2.self-menu-section(v-else)
      .self-loading
        i.mt-4.fas.fa-spinner.fa-spin

</template>

<script>

export default {
  name: "CreateShopRecommand",
  props: {
    shopList: {
      type: Array,
      default: () => {[]}
    }
  },
  computed: {
    isLoading() { return this.shopList.length > 0 }
  },
  methods: {
    openPage (shop) { this.$emit('select', shop) }
  }

}
</script>

<style lang="stylus" scoped>
  icon-bg-size = 3rem
  icon-bg-color = #6F5647

  icon-size = 20px
  icon-color = #fbffb9
  
  text-color = #6F5647

  .self-title
    letter-spacing 5px
  
  .self-pull-bar
    height 8px
    border-radius 4px
    width 50vw
    -webkit-print-color-adjust exact
    background-color #f1c881
    opacity 0.8

  p
    letter-spacing: 5px
    font-size 1.2rem
    color text-color

  .self-menu-section
    overflow auto
    height 65vh

  .self-icon
    height icon-bg-size
    width icon-bg-size
    -webkit-print-color-adjust exact
    background-color icon-bg-color
    border-radius 0.5rem
    text-align center
    display inline-block
  
  .self-icon > i
    font-size icon-size
    line-height icon-bg-size
    vertical-align middle
    color icon-color

  .self-result
    border-radius 0.5rem
    border-color none
    -webkit-print-color-adjust exact
    background-color #fcd48f80
  
  .self-loading
    width 100vw
    height 30vh
    text-align center

  .self-loading > i
    margin auto
    font-size 30px
    color text-color
    vertical-align middle
  
  .self-shadow
    box-shadow 0 20px 20px rgba(0,0,0,0.10), 0 10px 10px rgba(0,0,0,0.1)
</style>