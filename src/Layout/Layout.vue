<template >
  <div :class="layoutClass">
    <toolbar @controlSidebar="changeNavbar"></toolbar>
    <!-- Layouts container -->
    <div class="layout_main_container">

      <!-- Layout sidebar -->
      <div class="layout_sidebar border-round-xs">
        <app-menu></app-menu>
      </div>

      <!-- Layout main -->
      <div class="layout_main_section xl:px-2 lg:px-2 px-1 pb-2"  >
        <div class="pb-2">
         <top-app-menu v-show="get_menuType"></top-app-menu>
        </div>


        <!-- Router main -->
       <div class="pb-2  px-2 mt-1 min_main">
         <router-view ></router-view>
       </div>
        <!-- <AppFooter /> -->
      </div>
      
      <transition name="layout-mask" @click="changeNavbar()">
        <div class="layout-mask p-component-overlay" v-if="mobile_active"></div>
      </transition>
    </div>
  </div>
</template>
<script>
import AppMenu from "./AppMenu.vue";
import Toolbar from "./Toolbar.vue";
import TopAppMenu from "./TopAppMenu.vue";
import {mapActions, mapGetters} from "vuex"
export default {
  components: {
    Toolbar,
    AppMenu,
    TopAppMenu,
  },
  data() {
    return {
      sidebar: true,
      sidebar_statsic: true,
      sidebar_overall: false,
      mobile_active: false,
      menuBar:true,
      mobile_screen_width:991,
    };
  },
  created() {
    if (this.SCREEN_WIDTH > this.mobile_screen_width) {
      this.sidebar = false;
    }
  },
  computed: {
    ...mapGetters(["get_menuType", "get_Sidebar"]),
    layoutClass() {
      return [
        "layout-wrapper",
        {
          open_sidebar:!this.sidebar,
          close_sidebar: this.sidebar,
          sidebar_static: this.sidebar_statsic,
          sidebar_overall: this.SCREEN_WIDTH > this.mobile_screen_width && this.sidebar,
        },
      ];
    },
    // sidebar_bg() {
    //   if (this.sidebar && this.sidebar_overall) {
    //     return true;
    //   }
    // },
  },
  watch: {
    SCREEN_WIDTH(width) {
      if (width < this.mobile_screen_width) {
        this.sidebar = true;
      }
    },
    get_menuType(type){
      if(type){
        this.actionSidebar(false)
        this.sidebar= false
      }
    }
  },

  methods: {
    ...mapActions(["actionSidebar"]),
    changeNavbar() {
      this.actionSidebar(!this.sidebar)
      if (this.SCREEN_WIDTH < this.mobile_screen_width) {
        this.mobile_active = !this.sidebar;
      }
      this.sidebar = !this.sidebar;
    },
  },
  created(){
    this.sidebar = this.get_Sidebar; 
  }
};
</script>
<style lang="scss" >
.min_main{
  min-height: calc(100vh - 176px) !important;
}
</style>