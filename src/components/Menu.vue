<template lang="pug">
  .container
    h1 Welcome to menu
    .form-group
      label(for="disabledSelect") 雖然什麼都還沒有 不過來看看吧？
      select.form-control#disabledSelect()
        option(selected) Disabled select
        option Second
        option Third

    .form-group.mt-5.ml-1
      label(for="disabledSelect1") 雖然什麼都還沒有 不過來看看甜度吧？
      select.form-control#disabledSelect1()
        option(selected) 全糖
        option 七分糖
        option 半糖
        option 三分糖
        option 無糖

    .form-group.mt-5.ml-1
      label(for="disabledSelect2") 雖然什麼都還沒有 不過來看看冰塊吧？
      select.custom-select#disabledSelect2()
        option(selected) 正常
        option 少冰
        option 微冰
        option 去冰

    button.btn.btn-primary.btn-block(type="submit") 送出
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
      default: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
h3 
  margin: 40px 0 0
ul 
  list-style-type: none
  padding: 0
li 
  display: inline-block
  margin: 0 10px
a
  color: #42b983
</style>
