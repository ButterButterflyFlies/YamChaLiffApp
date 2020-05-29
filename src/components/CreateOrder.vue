<template lang="pug">
    div.self-wrap
      section(@click="showPan=false")
        create-page-shop-search.self-fixed-center(:group="params.group" :userId="profile.userId")
      section.self-pull-up-menu( :class="showPanel" v-pan="onPan")
        create-page-shop-recommand#container(
          :shopList="shopList"
          @select="openPage"
          )
      section.self-choose-branch-page(:class="showPage")
        create-page-select-branch(
          :active="pageFlag"
          :store="selectedStore"
          :group="params.group"
          :userId="profile.userId"
          @close="closePage")
</template>
<script>
  import axiosLine from 'axios'
  import _ from 'lodash'
  import CreatePageShopSearch from './CreatePageComponents/CreatePageShopSearch.vue'
  import CreatePageShopRecommand from './CreatePageComponents/CreatePageShopRecommand.vue'
  import CreatePageSelectBranch from "./CreatePageComponents/CreatePageSelectBranch.vue"
  import Hammer from 'hammerjs/hammer.js'

  export default {
    name: 'CreateOrder',
    components: {
      CreatePageShopSearch,
      CreatePageShopRecommand,
      CreatePageSelectBranch
    },
    directives: {
      pan: {
        bind: function(el, binding) {
          if (typeof binding.value === "function") {
            const mc = new Hammer(el);
            mc.get("pan").set({ direction: Hammer.DIRECTION_ALL });
            mc.on("pan", binding.value);
          }
        }
      }
    },
    props: {
      params: {
        type: Object,
        default: () => ({
          access_token: null,
          group: null
        })
      }
    },
    data() {
      return {
        pageFlag: false,
        shopList: [],
        selectedStore: null,
        selection: null,
        profile: {
          userId: ''
        },
        msg: '',
        showPan: false,

        ticking: false,
        scrollSensitivitySetting: 30, //Increase/decrease this number to change sensitivity to trackpad gestures (up = less sensitive; down = more sensitive) 
        slideDurationSetting: 600, //Amount of time for which slide is "locked"
        currentSlideNumber: 0,
        totalSlideNumber: 2
      }
    },
    computed: {
      showPage () { return this.pageFlag ? 'self-page-active' : ''},
      shopListString () { return this.shopList.length > 0 ? JSON.stringify(this.shopList) : '' },
      showPanel () { return this.showPan ? 'self-active' : ''}
    },
    created () {
      this.getShopList()
      this.getIdent()
    },
    methods: {
      getIdent() {
        axiosLine.get('https://api.line.me/v2/profile', {
          headers:{'Authorization': 'Bearer ' + this.params.access_token}
        }).then(res => {
          this.profile = res.data
          this.profileJSON = JSON.stringify(res.data)
        }).catch(err => {
          this.profileMsg = err
        })
      },
      getShopList() {
        axios.get('api/v1/stores', { useCredentails: true })
          .then(res => {
            this.msg = JSON.stringify(res)
            this.shopList = res.data.data
            this.$forceUpdate()
          }).catch(err => {
            this.msg = JSON.stringify(err)
            console.log(err)
          })
      },
      onPan: _.debounce(function () {
        this.showPan = true
      },100),

      onTap(e, value) {
        if (value) {
          TweenMax.to(e.target, 0.12, { scale: 1.1, yoyo: true, repeat: 1, ease: Sine.easeOut})
          this.selected = value;
        }
      },
      openPage (shop) {
        console.log('fetched')
        this.selectedStore = shop.id
        this.pageFlag = true
        // this.setCurrent(shop)
      },
      closePage () {
        this.pageFlag = false
      },
    }
  }
</script>
<style lang="stylus" scoped>
  @import url(//unpkg.com/leaflet@1.6.0/dist/leaflet.css);
  @import url(//api.mapbox.com/mapbox-gl-js/v1.7.0/mapbox-gl.css);
  background-color = #1a1b20
  menu-background = #FBFFB9
  
  parallax-offset= 30vh
  content-offset= 40vh
  
  transition-speed= 1.2
  slide-number= 3
  
  transition (time, property= all, easing= ease-in)
    transition: property time easing
  
  #container
    position: relative
    overflow: hidden
    width: 100%
    height: 78vh

  .self-choose-branch-page
    height 100vh
    width 100vw
    top 0
    position absolute
    z-index 0
    overflow hidden
    visibility hidden
    transition 0s visibility 0.3s, 0s z-index 0.3s

  .self-page-active
    z-index 1000
    visibility visible
    transition left 0.3s

  .self-wrap
    overflow: hidden
    position: relative
  
  .self-fixed-center
    display flex
    align-items center
    height: 100vh
    width: 100vw

  .self-pull-up-menu
    position: absolute
    transition: top 0.2s
    z-index 1000
    height: 100vh
    width:100vw
    left: 0
    right: 0
    top: 78vh
    margin-left: auto
    margin-right: auto
    border-radius: 1.5rem
    background-color: menu-background
    -moz-appearance none
    -webkit-appearance none
    

  .self-active
    top: 20vh!important
  
  .background 
    background-size: cover
    overflow: hidden
    will-change: transform
    backface-visibility: hidden
    height: (100vh + parallax-offset)
    position: fixed
    width: 100%
    transform: 'translateY(%s)' %(parallax-offset)
    transition(transition-speed, 'all', cubic-bezier(0.22, 0.44, 0, 1))
    &:before
      content: ""
      position: absolute
      width: 100%
      height: 100%
      top: 0
      left: 0
      right: 0
      bottom: 0
      background-color: rgba(0,0,0,.3)
      -webkit-print-color-adjust: exact;

    &:first-child 
      .content-wrapper
        transform: 'translateY(%s)' %(parallax-offset /2)

  num = slide-number+1
  for num in (1..num)
    .background:nth-child({num})
      z-index: (slide-number + 1) - num

  .content {
    &-wrapper {
    height: 100vh
    display: flex
    justify-content: center
    text-align: center
    flex-flow: column nowrap
    color: #fff
    font-family: 'Noto Sans TC', Helvetica, Arial, sans-serif
    text-transform: uppercase
    transform: 'translateY(%s)' %(content-offset)
    will-change: transform
    backface-visibility: hidden
    transition(transition-speed + .5, all, cubic-bezier(0.22, 0.44, 0, 1))
    }
    &-title {
      font-size: 12vh
      line-height: 1.4
    }
  }

  // ------------- SET TRANSFORM VALUES ------------- //

  .background.up-scroll 
    transform: 'translate3d(0, %s,0)' %-(parallax-offset / 2)
    .content-wrapper
      transform: 'translateY(%s)' %parallax-offset/2
    
    + .background
      transform: 'translate3d(0, %s,0)' %(parallax-offset)
      .content-wrapper
        transform: 'translateY(%s)' %(parallax-offset)

  .background.down-scroll
    transform: 'translate3d(0, %s,0)' %-(100vh + parallax-offset)
    .content-wrapper
      transform: 'translateY(%s)' %(content-offset)
    
    + .background:not(.down-scroll) 
      transform: 'translate3d(0, %s,0)' %-(parallax-offset / 2)
      .content-wrapper
        transform: 'translateY(%s)' %(parallax-offset / 2)
</style>