<template lang="pug">
  div.self-wrap(:class="isActive")
    .self-detail-tab( :class="detailFocused" @click="setFlag('detail')")
      .self-back-button.self-shadow-btn(@click="emitClose")
        i.fas.fa-chevron-left
      div(v-if="product.img_uri")
        cute-coffee
        //- img( :src="product.img_uri")
      //- product pics & detail
    .self-option-tab( :class="optionFocused" @click="setFlag('option')")
      .container.self-background-product
        .col-11.mx-auto.mt-5.row
          p.h5.self-title {{product.name}}
        .col-11.mt-1.mx-auto.row
          .col-6.pl-0
            p.h1.self-title ${{currentPrice}}
              span.h6.ml-1 元
          .col-2.align-self-center
            .self-icon(:class="sizeFocused('small')" @click="setSize('small')")
              i.fas.fa-coffee.self-small
          .col-2.ml-2.align-self-center
            .self-icon(:class="sizeFocused('large')" @click="setSize('large')")
              i.fas.fa-coffee.self-large
        .selection(:class="selectionFocused")
          .col-11.mx-auto.pt-5
            p 選擇甜度
          .col-11.mx-auto.form-group.row.pt-2.mb-5
            .col-2.text-center
              i.mt-2.fas.fa-thermometer-empty
            .col-8
              vue-slider(v-model="returnObject.sweet" :data="sweetData" :marks="true")
            .col-2.text-center
              i.mt-2.fas.fa-thermometer-full

          .col-11.mx-auto.mt-3
            p 選擇溫度
          .col-11.mx-auto.form-group.row.pt-2
            .col-2.text-center
              i.mt-2.fas.fa-fire
            .col-8
              vue-slider(v-model="returnObject.ice" :data="iceData" :marks="true")
            .col-2.text-center
              i.mt-2.fas.fa-snowflake
        .col-12.mt-3
          button.btn.self-btn.btn-block(type="submit" @click="submitReqeust") 送出
    update-order-modal(
      :displayName="displayName"
      :name="productName"
      :order="params.order"
      :currentSelection="returnObject"
      :orderData="orderData"
    )
</template>

<script>
import axiosLine from 'axios'
import CuteCoffee from './CuteCoffee.vue'
import VueSlider from 'vue-slider-component'
import UpdateOrderModal from './UpdateOrderModal.vue'
import 'vue-slider-component/theme/antd.css'

export default {
  name: 'AddItem',
  components: {
    VueSlider,
    CuteCoffee,
    UpdateOrderModal
  },
  props: {
    displayName: {
      type: String,
      default: ''
    },
    params: {
      type: Object,
      default: () => ({
        access_token: null,
        orderID: null,
      })
    },
    active: {
      type: Boolean,
      default: false
    },
    product: {
      type: Object,
      default: () => ({
        id: null,
        name: '',
        price: {
          small: '',
          large: ''
        },
        img_uri: null
      })
    },
    orderData: {
      type: Object,
      default: () => ({
        id: ''
      })
    }
  },
  data() {
    return {
      sizeSelected: 'small',
      sizeTag: {
        'small': '小',
        'medium': '中',
        'large': '大'
      },
      sweetData: ['無糖', '三分', '五分', '七分', '全糖'],
      iceData: ['熱', '溫', '去冰', '微冰', '少冰', '正常'],
      profile: {},
      returnObject: {
        userName: this.displayName,
        user: '',
        product: '',
        size: '小',
        sweet: '五分',
        ice: '去冰',
        price: ''
      },
      listData: [],
      options: [],
      // orderData: {},
      selected: 'detail',
      prodSelected: 0,
    }
  },
  computed: {
    productName () {return this.product.name},
    currentPrice () {return this.product.price ? this.product.price[this.sizeSelected].toString() : ''},
    isActive () {return this.active ? 'self-page-active' : 'self-page-close' },
    detailFocused () {return this.selected == 'detail' ? 'detail-active' : ''},
    optionFocused () {return this.selected == 'option' ? 'option-active' : ''},
    selectionFocused () {return this.selected == 'option' ? 'selection-active' : ''},
  },
  watch: {
    product (newVal) {
      if (newVal) {
        this.getOption()
        this.returnObject.product = newVal.id.toString()
      }
    }
  },
  async mounted() {
    // this.returnObject.user = this.params.user
    // await this.getIdent()
    // await this.getOrder()
    // await this.getList()
    // await this.getOption()
  },
  methods: {
    sizeFocused (size) {return this.sizeSelected == size ? 'self-icon-active' : 'self-icon-disable'},
    setSize (size) {
      this.sizeSelected = size
      this.returnObject.size = this.sizeTag[size]
      this.returnObject.price = this.product.price[size]
    },
    async getIdent() {
      return axiosLine.get('https://api.line.me/v2/profile', {
        headers:{'Authorization': 'Bearer ' + this.params.access_token}
      })
      .then(res => res.data)
      .then(res => {
        this.profile = res
        this.profileJSON = JSON.stringify(res)
        this.returnObject.user = res.userId
      }).catch(err => {
        this.profileMsg = err
      })
    },
    async getOrder () {
      // order param need modify
      return axios.get(`api/v1/orders/${this.params.order}`)
        .then(res => res.data)
        .then(res => {
          this.orderData = res.data[0]
        })
    },
    async getList () {
      return axios.get(`api/v1/menu/${this.orderData.branch_store_id}`)
        .then(res => res.data)
        .then(res => {
          this.listData = res.data
        })
    },
    getOption () {
      axios.get(`api/v1/extra/${this.product.id}`)
        .then(res => res.data)
        .then(res=> {
          // console.log(res)
          this.options = res.data
        })
    },
    setFlag (focus) {
      this.selected = focus
    },
    setVal () {
      const data = this.listData.filter(prod => prod.id == this.returnObject.product)[0]
      this.returnObject.size = data.size
      this.returnObject.price = data.price
    },
    submitReqeust () {
      this.handleReturn()
      console.log(this.orderData)
      $('#update-order-modal').modal()
      // axios.patch(`api/v1/orders/${this.params.order}`, this.orderData.order)
      //   .then(res=> {
      //     console.log(res)
      //   })
      //   .catch(err => {
      //     console.log(err)
      //   })
    },
    handleReturn () {
      if (Object.entries(this.orderData.order.length).length ==0) {
        this.orderData.order =[]
      }
      const currentOrder = this.orderData.order ? this.orderData.order.filter(order => order.userId == this.returnObject.userId): []
      if (currentOrder.length > 0) {
        const index = this.orderData.order.indexOf(currentOrder[0])
        this.orderData.order[index] = this.returnObject
      } else {
        this.orderData.order.push(this.returnObject)
      }
    },
    emitClose () {
      this.$emit("close",false)
    },
  },
}
</script>

<style lang="stylus" scoped>
  icon-height = 3rem
  icon-width = 3rem
  icon-color = #6F5647
  text-color = #6F5647
  background-color = #fcd48f

  icon-size = 20px
  icon-color = #fbffb9
  icon-color-disable = #eef1c5d6

  icon-bg-size = 3rem
  icon-bg-color = #6F5647
  icon-bg-disable-color = #6f564787

  background-color = #fcd48f

  .fa-fire
    color #ED644B
    font-size 1.2rem
  .fa-snowflake
    color #9DC4BF
    font-size 1.2rem
  .self-page-active
    width 100vw
    height 100vh
    position absolute
    left 0vw

  .self-page-close
    width 100vw
    height 100vh
    position absolute
    left 100vw
    transition left 0.3s

  .self-wrap
    position relative
    height: 100vh
    width: 100vw
    margin: 0
    padding: 0
    overflow hidden

  .self-detail-tab
    height: 40vh
    width: 100vw
    background-color #FBFFB9
    transition height 0.3s

  .detail-active
    height: 80vh
    transition height 0.5s

  .self-option-tab
    height: 80vh
    width: 100vw
    top: 70vh
    border-radius: 1.2rem
    position: absolute
    overflow: hidden
    z-index: 1000
    background-color: background-color
    transition: top 0.3s

  .option-active
    top: 30vh
    overflow auto
    transition top 0.3s

  .self-background-product
    background-color : background-color
  
  .self-back-button
    position absolute
    text-align center
    display inline-block
    vertical-align middle
    top 3vh
    left 3vh
    width 40px
    height 40px
    border-radius 50%
    z-index 1000
    -webkit-print-color-adjust exact
    background-color #ce9c7e
  
  .self-back-button > i
    line-height 40px
    vertical-align baseline
  
  .self-small
    font-size 1.2rem!important
  
  .self-large
    font-size 1.9rem!important

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
    vertical-align baseline
    color icon-color
  
  .self-color
    filter invert(.8)
  
  .selection
    height 0vh
    visibility hidden
    transition 0.3s height,0.3s margin-button, 0s visibility

  .selection-active
    height 40vh
    visibility visible
    margin-bottom 25px
    transition 0.3s height,0.3s margin-button, 0s visibility 0.1s

  i
    color white
    font-size 1.2rem

  .self-shadow-btn
    box-shadow 10px 10px 10px rgba(0,0,0,0.2), 5px 5px 5px rgba(0,0,0,0.2)
  
  .self-title
    letter-spacing 3px
  
  .self-btn
    background-color icon-bg-color
    color icon-color!important
    border-radius 10px!important
  
  .self-icon-disable
    background-color icon-bg-disable-color

  .self-icon-disable > i
    color icon-disable-color
</style>
