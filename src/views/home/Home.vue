<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp = 'loadMore'>
      <home-swiper :banners="banners"></home-swiper>
      <recommender-view :recommends="recommends"></recommender-view>
      <feature-view></feature-view>
      <tab-control class="tab-control"
                   :title="['流行','新款','精选']"
                   @tabclick="tabClick"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShow"></back-top>


  </div>
</template>

<script>
  import HomeSwiper from "./homeComps/HomeSwiper";
  import RecommenderView from "./RecommenderView";
  import FeatureView from "./FeatureView";

  import NavBar from "../../components/common/navbar/NavBar";
  import TabControl from "../../components/content/tabControl/TabControl";
  import GoodsList from "../../components/content/goods/GoodsList";
  import Scroll from "../../components/common/scroll/Scroll";
  import BackTop from "../../components/content/backTop/BackTop";

  import {getHomeMultidata,getHomeGoods} from "../../network/home";

  export default {
    name: "Home",
    components:{
      HomeSwiper,
      RecommenderView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data(){
      return{
        banners:[],
        recommends:[],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]}
        },
        currentType:'pop',
        isShow:false
      }
    },
    computed:{
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    created() {
      this.getHomeMultidata()
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

    },
    methods:{
      /**
       * 事件监听
       */
      tabClick(index){
          switch (index) {
            case 0:
              this.currentType='pop'
              break
            case 1:
              this.currentType='new'
              break
            case 2:
              this.currentType='sell'
          }
       },
      backClick(){
        this.$refs.scroll.scrollTo(0,0)
      },
      contentScroll(position){
        // console.log(position)
        this.isShow = (-position.y)>1000
      },
      loadMore(){
        // console.log("加载更多")
        this.getHomeGoods(this.currentType)
        this.$refs.scroll.scroll.refresh()
      },
      /**
       * 网络请求有关的方法
       */
      getHomeMultidata(){
        getHomeMultidata().then(res=>{
          // console.log(res)
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page+1
        getHomeGoods(type,page).then(res=>{
          console.log(res)
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page+=1
          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>
  *{
    margin: 0;
    padding:0;

  }
  #home{
    /*padding-top: 44px;*/
    position: relative;
    height: 100vh;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    top:0;
    left: 0;
    right: 0;
    z-index: 9;

  }
  .tab-control{
    position: sticky;
    top:44px;
    z-index: 9;
  }
  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    right: 0;
    left: 0;

  }
</style>
