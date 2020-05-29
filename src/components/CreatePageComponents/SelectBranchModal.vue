<template lang="pug">
  .modal.fade#branch-selection-modal(role="dialog" aria-hidden="true")  
    .modal-dialog.modal-dialog-centered(role="document")
      .modal-content
        //- .modal-header
          h5.modal-title 店家確認
          button.close(type="button" data-dismiss="modal" aria-label="Close")
            span(aria-hidden="true") &times;

        .modal-body
          .ml-3(v-if="state == 'configuration'")
            p.h4.mb-3.mt-2.self-confirm-title.text-center 確認分店 
            p.ml-2.h6.self-confirm-title 店名
            p.ml-2.h5.self-confirm-title {{ storeData.name}}
            
            p.mt-4.ml-2.h6.self-confirm-title 地址
            p.ml-2.h5.self-confirm-title {{ storeData.address }}
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
          .col-12.mx-0.mb-2.p-0
            button.btn.btn-lg.btn-block.self-btn-confirm(@click="createOrder()") 確認
          .col-12.mx-0.p-0
            button.btn.btn-lg.btn-block.self-btn-cancel(data-dismiss="modal" @click="clearData()") 取消
        
        .modal-footer.p-2(v-else)
          .col-12.mx-0.p-0
            button.btn.btn-lg.btn-block(data-dismiss="modal" @click="clearData()") 返回
            
</template>

<script>
export default {
  name: 'SelectBranchModal',
  props: {
    storeData: {
      type: Object,
      default: () => ({})
    },
    group: {
      type: String,
      default: ''
    },
    userId: {
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
    clearData() {
      this.state = 'configuration'
      this.$forceUpdate()
    },
    createOrder() {
      this.state = 'loading'
      axios.post('api/v1/orders', {
        creator_id: this.userId,
        group_id: this.group,
        branch_store_id: this.storeData.id,
      }).then(res => {
        this.state = 'successful'
        this.msg = JSON.stringify(res)
      }).catch(err => {
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
  .self-btn-confirm
    -webkit-print-color-adjust exact
    background-color #6f5647!important
    color #fcd48f !important
    font-weight 500!important
    letter-spacing 3px
  .self-btn-cancel
    border solid 2px #6f5647!important
    color #6f5647!important
    font-weight 600!important
    letter-spacing 3px
</style>