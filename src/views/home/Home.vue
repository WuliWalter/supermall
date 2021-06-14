<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommender-view :recommends="recommends"></recommender-view>
  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import {gerHomeMultidata} from "../../network/home";
  import HomeSwiper from "./homeComps/HomeSwiper";
  import RecommenderView from "./RecommenderView";

  export default {
    name: "Home",
    components:{
      NavBar,
      HomeSwiper,
      RecommenderView
    },
    data(){
      return{
        banners:[],
        recommends:[]
      }
    },
    created() {
      gerHomeMultidata().then(res=>{
        console.log(res)
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })

    }
  }
</script>

<style scoped>
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
