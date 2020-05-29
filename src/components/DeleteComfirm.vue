<template lang="pug">
  .container.text-center.pt-5
    i.pt-2.fas.fa-exclamation-triangle
    p.h5.pt-3 確定要刪除嗎？
    .self-button
      .col-12.justify-content-center.mt-4.m-0.p-0
        button.btn.self-btn-confirm.btn-block(@click="sendDelete") 確認
        button.btn.self-btn-cancel.btn-block(@click="closeWindow") 取消
</template>

<script>
export default {
  name: 'DeleteComfirm',
  props: {
    params: {
      type: Object,
      default: () => ({
        access_token: null,
        orderID: null,
      })
    }
  },
  methods: {
    closeWindow () {
      this.$liff.closeWindow()
    },
    sendDelete () {
      axios.delete(`api/v1/orders/${this.params.order}`)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
  bg-color = #FBFFB9
  text-color = #6F5647
  
  .self-button
    position absolute
    left 1rem
    right 1rem
    bottom 1rem

  .container
    color text-color
    letter-spacing 5px
    height 100vh
    background-color bg-color
  .container > i 
    font-size 3rem
  
  .self-btn-confirm
    background-color #6f5647!important
    color #fbffb9 !important
    font-weight 500!important
    letter-spacing 3px
  .self-btn-cancel
    border solid 2px #6f5647!important
    color #6f5647!important
    font-weight 600!important
    letter-spacing 3px
</style>