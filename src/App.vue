<template lang="pug">
  #app
    //- router-view 
    component(:is="component[params.path]" :params="params")

    //- p msg: {{this.msg}}
</template>

<script>
// import Menu from './components/Menu.vue'
import UpdateOrder from './components/UpdateOrder.vue'
import CuteCoffee from './components/UpdateOrderComponents/CuteCoffee.vue'
import CreateOrder from './components/CreateOrder.vue'
import DeleteComfirm from './components/DeleteComfirm.vue'
import CreatePageSelectBranch from './components/CreatePageComponents/CreatePageSelectBranch'
export default {
  name: 'App',
  components: {
    // Menu,
    UpdateOrder,
    CreateOrder,
    CreatePageSelectBranch,
    DeleteComfirm,
    CuteCoffee
  },
  data() {
    return {
      msg: null,
      params: {},
      component: {
        // menu: Menu,
        product: UpdateOrder,
        create: CreateOrder,
        delete: DeleteComfirm,
        map: CreatePageSelectBranch,
        test: CuteCoffee
      }
    }
  },
  computed: {
    groupID () { return this.test.group ? this.test.group : '' },
    orderID () { return this.test.order ? this.test.order : '' }
  },
  beforeCreate () {
    this.$liff.init(function () {
    })
    this.$liff.$hand.initAll(function () {
      this.$liff.$hand.changeHash()
    })
  },

  mounted () {
    this.href = window.location.href.split('?')[1]
    
    try {
      this.href.split('#').forEach(query => {
        const pair = this.splitQueryString(query)
        const object = Object.fromEntries(pair)
        this.params = {
          ...this.params,
          ...object
        }
      })
      this.msg = JSON.stringify(this.params)
    } catch(err) {
      console.error(err)
    }
    
    this.$forceUpdate()
  },
  methods: {
    splitQueryString (queryString) {
      return queryString.split('&').map(el => el.split('='))
    }
  }
}
</script>

<style lang="stylus">
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.min.css");
@import url("https://fonts.googleapis.com/css?family=Noto+Sans+TC&display=swap");

place-holder-color = #B7B7B7
body
  margin 0
  padding 0 
#app
  font-family: 'Noto Sans TC', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: #2c3e50
  width:100vw
  border none
  margin 0
  padding 0 
</style>
