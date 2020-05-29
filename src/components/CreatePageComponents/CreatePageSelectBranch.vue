<template lang="pug">
  div(:class="isActive")
    //- map component
    #map(@click="pageFocusArea(false)")
      transition(name="fade")
        l-map(ref="map" :options="{zoomControl:false}" class="map")
          l-tile-layer(:url="maps.api")
    
    //- back button
    .self-back-button.self-shadow-btn(@click="pageEmitClose")
      i.fas.fa-chevron-left
    
    //- option tab
    .self-option-tab( :class="optionFocused" @click="pageFocusArea(true)")
      p.h4.text-center.mt-4.self-title 熱門店家
      .mt-2(v-if="pageLoading")
        .self-loading
          i.mt-4.fas.fa-spinner.fa-spin

      .mt-2.self-menu-section(v-else)
        .col-11.mx-auto.row.mt-3.mb-3.p-3.self-result(
          v-for="(shop, index) in list" :key="index"
          @click="pageOpenModal(shop)")
          .col-2.align-self-center
            .self-icon
              i.fas.fa-coffee
              //- span.self-helper
              //- img.self-color(src="/coffe-cup.png")
          .col-1.align-self-center
          .col-7.align-self-center
            p.mb-0 {{shop.name}}
            p.mb-0 {{shop.address}}
      
    select-branch-modal(
      :storeData="branchStoreData"
      :group="group"
      :userId="userId"
    )
</template>

<script>
import {
  LMap,
  LTileLayer,
  LMarker,
  LTooltip,
  LPopup,
  LControlZoom,
  LLayerGroup
} from 'vue2-leaflet';
import SelectBranchModal from './SelectBranchModal.vue'
export default {
    components: {
        LMap,
        LTileLayer,
        LMarker,
        LTooltip,
        LPopup,
        LControlZoom,
        LLayerGroup,
        SelectBranchModal
    },
    props: {
      store: {
        type: Number,
        default: null
      },
      group: {
        type: String,
        default: ''
      },
      userId: {
        type: String,
        default: ''
      },
      active : {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        selected: false,
        pageLoading: true,
        branchStoreData: {},
        maps: {
          api: 'https://api.mapbox.com/styles/v1/ppckingdom888/ck6ir4xgh0mcm1iojflbl9yxo/tiles/256/{z}/{x}/{y}',
          key: 'pk.eyJ1IjoicHBja2luZ2RvbTg4OCIsImEiOiJjamozeGZheDIxOWpvM3J1bzU3OHZhajc4In0.rUNNesc6GaO9qShbsXJtjQ',
          attributes: {
            maxZoom: 16,
            minZoom: 10,
            zoomControl: true
          },
        },
      }
    },
    computed: {
      isActive () {return this.active ? 'self-page-active' : 'self-page-close' },
      optionFocused () {return this.selected ? 'option-active' : ''}
    },
    watch: {
      store (newVal, oldVal) {
        this.mapUpdateCenter({
          latitude: 24.540140,
          longitude: 121.271526
        }, 8)
        this.apiGetBranch()
      }
    },
    mounted () {
      this.maps.api += `?access_token=${this.maps.key}`
    },
    methods: {
      pageFocusArea (val) { this.selected = val },
      pageEmitClose () { this.$emit("close", false) },
      pageClearData () { this.list = [] },
      pageOpenModal (shop) {
        this.branchStoreData = shop
        $('#branch-selection-modal').modal()
      },

      mapUpdateCenter(data, zindex) {
        this.$refs.map.mapObject.setView([`${data.latitude}`, `${data.longitude}`], zindex)
      },

      apiGetBranch() {
        this.pageLoading= true
        axios.get(`api/v1/stores/${this.store}`)
          .then(res => res.data)
          .then(res => {
            this.list = res.data
            this.pageLoading= false
          })
      }
    }
}
</script>

<style lang="stylus" scoped>
    @import url(//unpkg.com/leaflet@1.6.0/dist/leaflet.css);
    @import url(//api.mapbox.com/mapbox-gl-js/v1.7.0/mapbox-gl.css);

    icon-height = 3rem
    icon-width = 3rem
    icon-color = #6F5647
    text-color = #6F5647
    background-color = #fcd48f

    icon-bg-size = 3rem
    icon-bg-color = #6F5647

  icon-size = 20px
  icon-color = #fbffb9

    img
      height 2rem
      width 2rem
      vertical-align middle
    
    .self-loading
      width 100vw
      height 30vh
      text-align center

    .self-loading > i
      margin auto
      font-size 30px
      color text-color
      vertical-align middle
    
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

    #map
      height 100vh
      width 100vw
      position absolute
      -webkit-print-color-adjust exact
      background-color grey

    .fade-enter-active, .fade-leave-active 
      transition opacity .5s

    .fade-enter, .fade-leave-to
      opacity 0

    .self-option-tab
      height: 80vh
      width: 100vw
      top: 70vh
      border-radius: 1.2rem
      position: absolute
      overflow: hidden
      z-index: 1000
      -webkit-print-color-adjust exact
      background-color background-color
      transition: top 0.3s

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
      vertical-align middle
    i
      color white
      font-size 1.2rem
    
    .option-active
      top: 50vh
      overflow auto
      transition top 0.3s
    
    .self-title
      letter-spacing: 7px

    .self-menu-section
      overflow auto
    .self-helper
      display inline-block
      height 100%
      vertical-align middle

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
    
    .self-color
      filter invert(.8)

    .self-result
      border-radius 0.5rem
      border-color none
      -webkit-print-color-adjust exact
      background-color #fcd48f80
    
    .self-shadow
      box-shadow 0 20px 20px rgba(0,0,0,0.10), 0 10px 10px rgba(0,0,0,0.1)
    
    .self-shadow-btn
      box-shadow 10px 10px 10px rgba(0,0,0,0.2), 5px 5px 5px rgba(0,0,0,0.2)

</style>