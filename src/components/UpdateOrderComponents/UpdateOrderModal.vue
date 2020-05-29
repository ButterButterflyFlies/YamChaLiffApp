<template lang="pug">
  .modal.fade#update-order-modal(role="dialog" aria-hidden="true")  
    .modal-dialog.modal-dialog-centered(role="document")
      .modal-content
        .modal-body
          .ml-3(v-if="state == 'configuration'")
            p.h4.mb-3.mt-2.self-confirm-title.text-center 確認品項 
            p.ml-2.h6.self-confirm-title 品名
            p.ml-2.h4.self-confirm-title {{ name }} ({{currentSelection.size}})
            
            p.mt-4.ml-2.h6.self-confirm-title 甜度
            p.ml-2.h4.self-confirm-title {{ currentSelection.sweet }}

            p.mt-4.ml-2.h6.self-confirm-title 冰塊
            p.ml-2.h4.self-confirm-title {{ currentSelection.ice }}
            //- p group: {{group}}
            //- p userId: {{userId}}
          .ml-3(v-else-if="state == 'loading'")
            .self-loading
              i.mt-4.fas.fa-spinner.fa-spin
              p.mt-4.h6 載入中...

          .ml-3(v-else-if="state == 'successful'")
            .self-loading
              i.mt-4.fas.fa-check-circle
              p.mt-4.h6 送出成功，請關閉視窗

          .ml-3.text-center(v-else-if="state == 'faulure'")
            .self-loading
              i.mt-4.fas.fa-exclamation-crirle
              p.mt-4.h6 送出失敗，請稍後重試
          
        .modal-footer.p-2(v-if="state == 'configuration'")
          .col-12.mx-auto.mb-2
            button.btn.btn-lg.btn-block.self-btn-confirm(@click="updateOrder()") 確認
          .col-12.mx-auto.mt-1
            button.btn.btn-lg.btn-block.self-btn-cancel(data-dismiss="modal" @click="clearData()") 取消
        
        .modal-footer.p-2(v-else-if="state != 'loading'")
          .col-12.mx-auto
            button.btn.btn-lg.btn-block.self-btn-confirm(data-dismiss="modal" @click="clearData()") 返回
            
</template>

<script>
export default {
  name: 'SelectOrderModal',
  props: {
    displayName: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    currentSelection: {
      type: Object,
      default: () => ({})
    },
    orderData: {
      type: Object,
      default: () => ({})
    },
    order: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      state: 'configuration',
      selected: '',
      msg: ''
    }
  },
  methods: {
    clearData () {
      this.state = 'configuration'
      this.$forceUpdate()
    },
    updateOrder () {
      this.state = 'loading'
      console.log('send data',this.orderData)
      // axios.patch(`api/v1/orders/${this.params.order}`, this.orderData.order)
      //   .then(res=> {
      //     console.log(res)
      //   })
      //   .catch(err => {
      //     console.log(err)
      //   })
      axios.patch(`api/v1/orders/${this.order}`, this.orderData)
      .then(res => {
        // delay(1000)
        this.state = 'successful'
        this.msg = JSON.stringify(res)
      }).catch(err => {
        // delay(1000)
        this.state = 'failure'
        console.log(err)
        this.msg = JSON.stringify(err)
      })
    }
  }
}
</script>

<style lang="stylus">
  text-color = #6F5647
  background-color = #fcd48f
  
  .modal-content
    border none!important
    // border-radius 12px!important
    opacity 1
    -webkit-print-color-adjust exact
    background-color background-color!important

  .modal-dialog
    margin 0px!important

  .modal-dialog-centered
    align-items flex-end!important
    -webkit-print-color-adjust exact
    background-color #000000BF
    min-height 100vh!important

  .modal-footer
    flex-direction: column!important  

  .self-confirm-title
    letter-spacing 1px

  .modal-backdrop
    display none

  .self-loading
    width 100%
    height 50%
    text-align center
  
  .self-loading > i
    margin auto
    font-size 30px
    color text-color
    vertical-align middle
  
  .self-btn-cancel
    border solid 2px #6f5647!important
    border-radius 10px!important
    color #6f5647!important
    font-weight 600!important
    letter-spacing 3px
  
  .self-btn-confirm
    background-color icon-bg-color
    color icon-color!important
    border-radius 10px!important
  
</style>