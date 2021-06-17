<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>

    </div>

  </div>
</template>

<script>
  import Bscroll from 'better-scroll'
  import ObserveDOM from '@better-scroll/observe-dom'
  Bscroll.use(ObserveDOM)
  export default {
    name: "Scroll",
    props:{
      probeType: {
        type:Number,
        default:0
      },
      pullUpLoad: {
        type:Boolean,
        default: false
      }
    },
    data(){
      return{
        scroll:null
      }
    },
    methods:{
      scrollTo(x,y,time=500){
        this.scroll.scrollTo(x,y,time)
      },
      finishPullUp(){
        this.scroll.finishPullUp()
      }

    },
    mounted() {
      this.scroll = new Bscroll(this.$refs.wrapper,{
        observeDOM: true,
        click:true,
        probeType:this.probeType,
        pullUpLoad:this.pullUpLoad

      })
      this.scroll.on('scroll',position=>{
        this.$emit('scroll',position)
      })
      this.scroll.on('pullingUp',()=>{
        this.$emit('pullingUp')
      })
    }

  }
</script>

<style scoped>

</style>
